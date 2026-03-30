import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program, BN } from "@coral-xyz/anchor";

// Program ID from the deployed Anchor contract
export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID || "2Uara5WztgDSC9h53URFf2DjZk4ywqfFbo2oV4SsjqzL"
);

// USDC Mint on Solana mainnet (hardcoded to avoid env var mismatch)
export const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

// Platform treasury for fee collection
export const PLATFORM_TREASURY = new PublicKey(
  process.env.NEXT_PUBLIC_PLATFORM_TREASURY || "EXfwhcXo4pEnQELa2zwdhhGDgPrVLmumBRRMTYyzWHv2"
);

// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Solana connection
export function getConnection(): Connection {
  const rpcUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://mainnet.helius-rpc.com/?api-key=c9227f16-f3e6-4a63-a5a3-15d469cf32c8";
  return new Connection(rpcUrl, "confirmed");
}

// Derive market PDA
export function getMarketPDA(dbMarketId: number): [PublicKey, number] {
  const idBuffer = Buffer.alloc(8);
  idBuffer.writeBigUInt64LE(BigInt(dbMarketId));
  return PublicKey.findProgramAddressSync(
    [Buffer.from("market"), idBuffer],
    PROGRAM_ID
  );
}

// Derive position PDA
export function getPositionPDA(
  marketPubkey: PublicKey,
  userPubkey: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("position"), marketPubkey.toBuffer(), userPubkey.toBuffer()],
    PROGRAM_ID
  );
}

// Derive YES vault PDA
export function getYesVaultPDA(dbMarketId: number): [PublicKey, number] {
  const idBuffer = Buffer.alloc(8);
  idBuffer.writeBigUInt64LE(BigInt(dbMarketId));
  return PublicKey.findProgramAddressSync(
    [Buffer.from("yes_vault"), idBuffer],
    PROGRAM_ID
  );
}

// Derive NO vault PDA
export function getNoVaultPDA(dbMarketId: number): [PublicKey, number] {
  const idBuffer = Buffer.alloc(8);
  idBuffer.writeBigUInt64LE(BigInt(dbMarketId));
  return PublicKey.findProgramAddressSync(
    [Buffer.from("no_vault"), idBuffer],
    PROGRAM_ID
  );
}

// IDL type (minimal for client-side usage)
export const IDL = {
  version: "0.1.0",
  name: "nolimit_prediction_market",
  instructions: [
    {
      name: "takePosition",
      accounts: [
        { name: "market", isMut: true, isSigner: false },
        { name: "position", isMut: true, isSigner: false },
        { name: "yesVault", isMut: true, isSigner: false },
        { name: "noVault", isMut: true, isSigner: false },
        { name: "userUsdcAccount", isMut: true, isSigner: false },
        { name: "platformTreasury", isMut: true, isSigner: false },
        { name: "creatorUsdcAccount", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: true },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "isYes", type: "bool" },
        { name: "amount", type: "u64" },
      ],
    },
    {
      name: "claimWinnings",
      accounts: [
        { name: "market", isMut: false, isSigner: false },
        { name: "position", isMut: true, isSigner: false },
        { name: "yesVault", isMut: true, isSigner: false },
        { name: "noVault", isMut: true, isSigner: false },
        { name: "userUsdcAccount", isMut: true, isSigner: false },
        { name: "user", isMut: false, isSigner: true },
        { name: "tokenProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
  ],
} as const;
