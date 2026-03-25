import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";
import {
  PROGRAM_ID,
  USDC_MINT,
  PLATFORM_TREASURY,
  getConnection,
  getMarketPDA,
  getPositionPDA,
  getYesVaultPDA,
  getNoVaultPDA,
} from "./solanaClient";

// Anchor instruction discriminators (first 8 bytes of sha256("global:<instruction_name>"))
// These are pre-computed for the program
const TAKE_POSITION_DISCRIMINATOR = Buffer.from([
  // sha256("global:take_position") first 8 bytes
  0xa4, 0xf0, 0x2b, 0xa5, 0x8c, 0x8e, 0x6e, 0x7a,
]);

const CLAIM_WINNINGS_DISCRIMINATOR = Buffer.from([
  // sha256("global:claim_winnings") first 8 bytes
  0x9a, 0x0e, 0x37, 0x7b, 0x2a, 0x7c, 0x72, 0x1e,
]);

/**
 * Get or create associated token account for USDC
 */
export async function getOrCreateUsdcAta(
  connection: Connection,
  payer: PublicKey,
  owner: PublicKey,
  signTransaction: (tx: Transaction) => Promise<Transaction>
): Promise<PublicKey> {
  const ata = await getAssociatedTokenAddress(USDC_MINT, owner, true);

  const accountInfo = await connection.getAccountInfo(ata);
  if (!accountInfo) {
    const tx = new Transaction().add(
      createAssociatedTokenAccountInstruction(payer, ata, owner, USDC_MINT)
    );
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = payer;
    const signed = await signTransaction(tx);
    await connection.sendRawTransaction(signed.serialize());
  }

  return ata;
}

/**
 * Get USDC balance for a wallet
 */
export async function getUsdcBalance(walletAddress: string): Promise<bigint> {
  const connection = getConnection();
  const owner = new PublicKey(walletAddress);
  const ata = await getAssociatedTokenAddress(USDC_MINT, owner);

  try {
    const balance = await connection.getTokenAccountBalance(ata);
    return BigInt(balance.value.amount);
  } catch {
    return BigInt(0);
  }
}

/**
 * Place a trade (take position) on a Solana prediction market
 */
export async function placeTrade(
  walletPublicKey: PublicKey,
  signTransaction: (tx: Transaction) => Promise<Transaction>,
  dbMarketId: number,
  isYes: boolean,
  amountMicroUsdc: bigint,
  creatorAddress: string
): Promise<string> {
  const connection = getConnection();

  // Derive all PDAs
  const [marketPDA] = getMarketPDA(dbMarketId);
  const [positionPDA] = getPositionPDA(marketPDA, walletPublicKey);
  const [yesVaultPDA] = getYesVaultPDA(dbMarketId);
  const [noVaultPDA] = getNoVaultPDA(dbMarketId);

  // Get user's USDC ATA
  const userUsdcAta = await getAssociatedTokenAddress(
    USDC_MINT,
    walletPublicKey
  );

  // Get platform treasury USDC ATA
  const platformTreasuryAta = await getAssociatedTokenAddress(
    USDC_MINT,
    PLATFORM_TREASURY
  );

  // Get creator's USDC ATA
  const creatorPubkey = new PublicKey(creatorAddress);
  const creatorUsdcAta = await getAssociatedTokenAddress(
    USDC_MINT,
    creatorPubkey
  );

  // Build the instruction data
  const isYesByte = isYes ? 1 : 0;
  const amountBuffer = Buffer.alloc(8);
  amountBuffer.writeBigUInt64LE(amountMicroUsdc);

  const data = Buffer.concat([
    TAKE_POSITION_DISCRIMINATOR,
    Buffer.from([isYesByte]),
    amountBuffer,
  ]);

  // Build the transaction
  const tx = new Transaction().add({
    keys: [
      { pubkey: marketPDA, isSigner: false, isWritable: true },
      { pubkey: positionPDA, isSigner: false, isWritable: true },
      { pubkey: yesVaultPDA, isSigner: false, isWritable: true },
      { pubkey: noVaultPDA, isSigner: false, isWritable: true },
      { pubkey: userUsdcAta, isSigner: false, isWritable: true },
      { pubkey: platformTreasuryAta, isSigner: false, isWritable: true },
      { pubkey: creatorUsdcAta, isSigner: false, isWritable: true },
      { pubkey: walletPublicKey, isSigner: true, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data,
  });

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = walletPublicKey;

  const signed = await signTransaction(tx);
  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature, "confirmed");

  return signature;
}

/**
 * Claim winnings from a resolved market
 */
export async function claimWinnings(
  walletPublicKey: PublicKey,
  signTransaction: (tx: Transaction) => Promise<Transaction>,
  dbMarketId: number
): Promise<string> {
  const connection = getConnection();

  const [marketPDA] = getMarketPDA(dbMarketId);
  const [positionPDA] = getPositionPDA(marketPDA, walletPublicKey);
  const [yesVaultPDA] = getYesVaultPDA(dbMarketId);
  const [noVaultPDA] = getNoVaultPDA(dbMarketId);

  const userUsdcAta = await getAssociatedTokenAddress(
    USDC_MINT,
    walletPublicKey
  );

  const data = CLAIM_WINNINGS_DISCRIMINATOR;

  const tx = new Transaction().add({
    keys: [
      { pubkey: marketPDA, isSigner: false, isWritable: false },
      { pubkey: positionPDA, isSigner: false, isWritable: true },
      { pubkey: yesVaultPDA, isSigner: false, isWritable: true },
      { pubkey: noVaultPDA, isSigner: false, isWritable: true },
      { pubkey: userUsdcAta, isSigner: false, isWritable: true },
      { pubkey: walletPublicKey, isSigner: true, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data,
  });

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = walletPublicKey;

  const signed = await signTransaction(tx);
  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature, "confirmed");

  return signature;
}
