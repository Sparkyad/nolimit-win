"use client";
import { PageFrame } from "@/components/page-frame";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Camera01Icon,
  Share05Icon,
  UploadCircle02Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { ActiveListSkeleton } from "../components/ActiveListSkeleton";
import { ClosedListSkeleton } from "../components/ClosedListSkeleton";
import { ProfileData } from "@/components/Portfolio/components/portfolio-header";
import { formatJoinedDate } from "@/lib/formatJoinedDate";
import { ProfileUnclaimedRewards } from "../components/profile-unclaimed-rewards";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";
import { ProfilePositions } from "../components/profile-positions";
import { ProfileAchievements } from "../components/profile-achivevements";
import { Skeleton } from "@/components/ui/skeleton";
import { Pen } from "lucide-react";
import { slugifyFilename } from "@/utils/slugify-filename";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PortfolioLineChart } from "@/components/Portfolio/chart/portfolio-chart";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { ProfileChart } from "../Chart/profile-chart";
const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const MIN_IMAGE_SIZE = 5 * 1024;

// Shared upload logic
const uploadImageToCloudflare = async (file: File): Promise<string> => {
  const safeFilename = slugifyFilename(file.name);
  const uploadUrlRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/markets/upload-url?filename=${encodeURIComponent(
      safeFilename,
    )}&contentType=${encodeURIComponent(file.type)}`,
    { credentials: "include" },
  );

  if (!uploadUrlRes.ok) {
    throw new Error("Failed to get upload URL");
  }

  const { publicUrl, putUrl } = await uploadUrlRes.json();

  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!putRes.ok) {
    throw new Error("Failed to upload image to Cloudflare");
  }

  return publicUrl;
};

const updateProfile = async (data: {
  username?: string;
  avatarUrl?: string;
}): Promise<void> => {
  const profileRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/me`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  if (!profileRes.ok) {
    const text = await profileRes.text();
    throw new Error(text);
  }
};
export const ProfileView = () => {
  return (
    <PageFrame>
      <div className="p-2 md:px-4 md:py-10 mb-32 md:mb-0 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 bg-[#151515] rounded-lg">
          <ProfileHeader />
          <ProfileUnclaimedRewards />
          {/* <ProfileAchievements /> */}
          <ProfilePositions />
        </div>
      </div>
    </PageFrame>
  );
};

export type ProfileStats = {
  totalPnL: number;
  totalVolume: number;
  marketsCreated: number;
  marketsCreatedVolume: number;
};

export const ProfileHeader = () => {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toBase58();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isProfileLoaded = !!profileData;

  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  // Achivemenents Stats

  const [stats, setStats] = useState<ProfileStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfileData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${walletAddress}`,
        );

        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled) {
          setStats(data?.stats);
          setProfileData(data);
        }
        // console.log("Profile Data:", data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    }

    if (walletAddress) {
      fetchProfileData();
    }

    return () => {
      cancelled = true;
    };
  }, [walletAddress, refetchKey]);

  const shareUrl = walletAddress
    ? `https://www.nolimit.win/portfolio/${walletAddress}`
    : "";

  const handleCopy = useCallback(async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setOpenTooltip(true);

      setTimeout(() => {
        setCopied(false);
        setOpenTooltip(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  }, [shareUrl]);

  return (
    <div className="p-5 flex flex-col gap-6 md:flex-row justify-between">
      <div className="flex flex-col gap-5 p-4 flex-2 rounded-2xl border border-neutral-800 ">
        <div className="relative w-20 lg:w-24 aspect-square rounded-full">
          {!imageLoaded && (
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,#1f1f1f,45%,#2a2a2a,55%,#1f1f1f)] bg-[length:200%_100%] animate-[ImageShimmer_1.4s_infinite]" />
          )}

          {profileData?.avatarUrl && (
            <img
              src={profileData.avatarUrl}
              alt="profile-image"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover aspect-square rounded-full border-2 border-white transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
            />
          )}

          <EditPhoto onSuccess={() => setRefetchKey((v) => v + 1)} />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xl font-bold line-clamp-1 truncate flex gap-4 items-center">
            <span className="relative">
              {!isProfileLoaded && (
                <Skeleton className="h-6 w-28 rounded-sm " />
              )}

              {isProfileLoaded && (
                <span className="block text-xl font-bold line-clamp-1 truncate transition-opacity duration-200">
                  {profileData.username ?? profileData.walletAddress}
                </span>
              )}
            </span>
            <span>
              <EditUsername onSuccess={() => setRefetchKey((v) => v + 1)} />
            </span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-300 font-light flex">
              Joined {formatJoinedDate(profileData?.joinedAt || "")}
            </span>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-neutral-400"
                >
                  <HugeiconsIcon
                    icon={Share05Icon}
                    className="size-5 cursor-pointer hover:text-white"
                  />
                </button>
              </TooltipTrigger>

              <TooltipContent>
                <span>{copied ? "Copied!" : "Share"}</span>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="pt-3">
            <ProfileAchievements stats={stats} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="border rounded-2xl border-neutral-800 w-full  h-full">
          <ProfileChart className="rounded-2xl h-full" />
        </div>
      </div>
    </div>
  );
};
interface ProfileImageUplaodProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export const ProfileImageUpload = ({
  files,
  setFiles,
}: ProfileImageUplaodProps) => {
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  return (
    <div>
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export const validateImageFile = (file: File): void => {
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image size must be 3MB or less");
  }

  if (file.size < MIN_IMAGE_SIZE) {
    throw new Error("Invalid image file");
  }
};

export const EditPhoto = ({ onSuccess }: { onSuccess: () => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSaveChanges = async () => {
    if (!files[0]) {
      showErrorToast("Please select an image");
      return;
    }

    try {
      validateImageFile(files[0]);
      setLoading(true);

      const publicUrl = await uploadImageToCloudflare(files[0]);
      await updateProfile({ avatarUrl: publicUrl });

      showSuccessToast("Profile updated successfully 🎉");
      onSuccess();
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      showErrorToast(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form className="border-none">
        <DialogTrigger asChild>
          <span className="absolute -bottom-2 right-0 h-9 w-9 bg-gradient-to-b from-[#6A4BC6] to-[#2E255A] aspect-square rounded-full flex items-center justify-center cursor-pointer shadow-sm">
            <HugeiconsIcon icon={Camera01Icon} className="size-4" />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-linear-to-b from-neutral-950 to-neutral-900 border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-sm text-neutral-300">
              Edit profile picture
            </DialogTitle>
          </DialogHeader>
          <div>
            <ProfileImageUpload files={files} setFiles={setFiles} />
          </div>

          <DialogFooter className="flex flex-row">
            <DialogClose asChild className="flex-1">
              <Button className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              variant="marketGradient"
              className="cursor-pointer flex-1"
              onClick={handleSaveChanges}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

// export const EditProfile = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [username, setUsername] = useState("");
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleSaveChanges = async () => {
//     if (!files[0]) {
//       showErrorToast("Please select an image");
//       return;
//     }

//     const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
//     if (!usernameRegex.test(username)) {
//       showErrorToast(
//         "Username must be 3–20 characters and contain only letters, numbers, or underscores"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const file = files[0];
//       const safeFilename = slugifyFilename(file.name);
//       const uploadUrlRes = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_BASE_URL
//         }/api/markets/upload-url?filename=${encodeURIComponent(
//           safeFilename
//         )}&contentType=${encodeURIComponent(file.type)}`,
//         {
//           credentials: "include",
//         }
//       );

//       // const data = await uploadUrlRes.json()
//       // console.log("UploadRes",data)

//       if (!uploadUrlRes.ok) {
//         throw new Error("Failed to get upload URL");
//       }

//       const { publicUrl, putUrl } = await uploadUrlRes.json();

//       const putRes = await fetch(putUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": file.type,
//         },
//         body: file,
//       });

//       if (!putRes.ok) {
//         throw new Error("Failed to upload image to Cloudflare");
//       }

//       const profileRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/me`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username,
//             avatarUrl: publicUrl,
//           }),
//         }
//       );

//       if (!profileRes.ok) {
//         const text = await profileRes.text();
//         throw new Error(text);
//       }

//       showSuccessToast("Profile updated successfully 🎉");
//       onSuccess();
//       setOpen(false);
//     } catch (err: any) {
//       console.error(err);
//       showErrorToast(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <form className="border-none">
//         <DialogTrigger asChild>
//           <Button
//             variant="ghost"
//             className="cursor-pointer px-3 lg:px-5 text-sm"
//           >
//             Edit Profile
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] bg-linear-to-b from-neutral-950 to-neutral-900 border-neutral-700">
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//           </DialogHeader>
//           <div>
//             <ProfileImageUpload files={files} setFiles={setFiles} />
//           </div>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Username</Label>
//               <Input
//                 id="name-1"
//                 name="name"
//                 value={username}
//                 className="border-neutral-800"
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//           </div>
//           <DialogFooter className="flex flex-row">
//             <DialogClose asChild className="flex-1">
//               <Button className="cursor-pointer">Cancel</Button>
//             </DialogClose>
//             <Button
//               type="button"
//               variant="marketGradient"
//               className="cursor-pointer flex-1"
//               onClick={handleSaveChanges}
//             >
//               {loading ? "Saving..." : "Save changes"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// };

// export const validateImageFile = (file: File): void => {
//   if (file.size > MAX_IMAGE_SIZE) {
//     throw new Error("Image size must be 3MB or less");
//   }

//   if (file.size < MIN_IMAGE_SIZE) {
//     throw new Error("Invalid image file");
//   }
// };

// interface ProfileImageUploadProps {
//   files: File[];
//   setFiles: (files: File[]) => void;
//   setSelectedImage: (url: string) => void;
//   setCropOpen: (open: boolean) => void;
// }

// export const ProfileImageUpload = ({
//   files,
//   setFiles,
//   setSelectedImage,
//   setCropOpen,
// }: ProfileImageUploadProps) => {
//   const handleFileUpload = (files: File[]) => {
//     if (!files[0]) return;

//     try {
//       validateImageFile(files[0]);

//       setFiles(files);
//       setSelectedImage(URL.createObjectURL(files[0]));
//       setCropOpen(true);
//     } catch (err: any) {
//       showErrorToast(err.message);
//     }
//   };

//   return (
//     <div>
//       <FileUpload onChange={handleFileUpload} />
//     </div>
//   );
// };

// export const EditPhoto = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const [cropOpen, setCropOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const [crop, setCrop] = useState<Crop>();
//   const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

//   const imgRef = useRef<HTMLImageElement | null>(null);

//   const handleSaveChanges = async () => {
//     if (!files[0]) {
//       showErrorToast("Please select an image");
//       return;
//     }

//     try {
//       validateImageFile(files[0]);
//       setLoading(true);

//       const publicUrl = await uploadImageToCloudflare(files[0]);
//       await updateProfile({ avatarUrl: publicUrl });

//       showSuccessToast("Profile updated successfully 🎉");
//       onSuccess();
//       setOpen(false);
//     } catch (err: any) {
//       console.error(err);
//       showErrorToast(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCroppedFile = async (
//     image: HTMLImageElement,
//     crop: PixelCrop,
//   ): Promise<File> => {
//     const canvas = document.createElement("canvas");

//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;

//     canvas.width = crop.width;
//     canvas.height = crop.height;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) throw new Error("Canvas error");

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height,
//     );

//     return new Promise((resolve) => {
//       canvas.toBlob(
//         (blob) => {
//           if (!blob) return;
//           resolve(
//             new File([blob], "profile.jpg", {
//               type: "image/jpeg",
//             }),
//           );
//         },
//         "image/jpeg",
//         0.9,
//       );
//     });
//   };

//   const handleCropConfirm = async () => {
//     if (!completedCrop || !imgRef.current) return;

//     const cropped = await getCroppedFile(imgRef.current, completedCrop);

//     setFiles([cropped]);
//     setCropOpen(false);

//     if (selectedImage) URL.revokeObjectURL(selectedImage);
//   };

//   return (
//     <>
//       {/* MAIN EDIT DIALOG */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <form className="border-none">
//           <DialogTrigger asChild>
//             <span className="absolute -bottom-2 right-0 h-9 w-9 bg-gradient-to-b from-[#6A4BC6] to-[#2E255A] rounded-full flex items-center justify-center cursor-pointer shadow-sm">
//               <HugeiconsIcon icon={Camera01Icon} className="size-4" />
//             </span>
//           </DialogTrigger>

//           <DialogContent className="sm:max-w-[425px] bg-linear-to-b from-neutral-950 to-neutral-900 border-neutral-700">
//             <DialogHeader>
//               <DialogTitle className="text-sm text-neutral-300">
//                 Edit profile picture
//               </DialogTitle>
//             </DialogHeader>

//             <label className="mb-4 aspect-square rounded-xl overflow-hidden bg-neutral-900 cursor-pointer block">
//               {files[0] ? (
//                 <img
//                   src={URL.createObjectURL(files[0])}
//                   className="w-full h-full object-cover"
//                   alt="Profile"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
//                   <div className="flex flex-col gap-3 items-center">
//                     <HugeiconsIcon icon={UploadCircle02Icon} />
//                     <span className="text-lg font-semibold">
//                       Upload an Image
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Hidden FileUpload */}
//               <div className="hidden">
//                 <FileUpload
//                   onChange={(uploaded) => {
//                     if (!uploaded[0]) return;

//                     try {
//                       validateImageFile(uploaded[0]);
//                       setFiles(uploaded);
//                       setSelectedImage(URL.createObjectURL(uploaded[0]));
//                       setCropOpen(true);
//                     } catch (err: any) {
//                       showErrorToast(err.message);
//                     }
//                   }}
//                 />
//               </div>
//             </label>

//             <DialogFooter className="flex flex-row">
//               <DialogClose asChild className="flex-1">
//                 <Button>Cancel</Button>
//               </DialogClose>

//               <Button
//                 type="button"
//                 variant="marketGradient"
//                 className="flex-1"
//                 onClick={handleSaveChanges}
//               >
//                 {loading ? "Saving..." : "Save changes"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </form>
//       </Dialog>

//       {/* CROP DIALOG */}
//       <Dialog open={cropOpen} onOpenChange={setCropOpen}>
//         <DialogContent className="bg-neutral-950 border-neutral-700">
//           <DialogHeader>
//             <DialogTitle className="text-sm text-neutral-300">
//               Crop photo
//             </DialogTitle>
//           </DialogHeader>

//           {selectedImage && (
//             <ReactCrop
//               crop={crop}
//               onChange={(_, percentCrop) => setCrop(percentCrop)}
//               onComplete={(c) => setCompletedCrop(c)}
//               aspect={1}
//               circularCrop
//             >
//               <img ref={imgRef} src={selectedImage} alt="Crop" />
//             </ReactCrop>
//           )}

//           <DialogFooter>
//             <Button variant="marketGradient" onClick={handleCropConfirm}>
//               Crop & Save
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

export const EditUsername = ({ onSuccess }: { onSuccess: () => void }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSaveChanges = async () => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      showErrorToast(
        "Username must be 3–20 characters and contain only letters, numbers, or underscores",
      );
      return;
    }

    try {
      setLoading(true);

      const existsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/username/${username}/exists`,
        { credentials: "include" },
      );

      if (!existsRes.ok) {
        throw new Error("Failed to check username availability");
      }

      const { exists } = await existsRes.json();

      if (exists) {
        showErrorToast("Username already taken");
        return;
      }

      await updateProfile({ username });

      showSuccessToast("Profile updated successfully 🎉");
      onSuccess();
      setOpen(false);
    } catch (err: any) {
      console.error(err);
      showErrorToast(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form className="border-none">
        <DialogTrigger asChild>
          <Pen className="size-4 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-linear-to-b from-neutral-950 to-neutral-900 border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-sm text-neutral-300">
              Edit username
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Username</Label>
              <Input
                id="name-1"
                name="name"
                value={username}
                className="border-neutral-800"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row">
            <DialogClose asChild className="flex-1">
              <Button className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              variant="marketGradient"
              className="cursor-pointer flex-1"
              onClick={handleSaveChanges}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
