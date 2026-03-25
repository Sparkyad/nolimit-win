"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { useState } from "react";
import { MarketFormData } from "../../View/create-market-view";
import { showErrorToast, showSuccessToast } from "../form-toasts";
import { UploadCloud, Video } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { slugifyFilename } from "@/utils/slugify-filename";

const MAX_VIDEO_SIZE = 15 * 1024 * 1024;

export const VideoUpload = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-300 font-medium tracking-wider">Video</span>
      <div className="max-w-96">
        <VideoDropzone data={data} setData={setData} />
      </div>
    </div>
  );
};

export const VideoDropzone = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  const [uploading, setUploading] = useState(false);

  const validateAndSetVideo = (file: File) => {
    if (file.size > MAX_VIDEO_SIZE) {
      showErrorToast("Video size must be 15MB or less");
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);

      if (video.duration > 15) {
        showErrorToast("Video length must be 15 seconds or less");
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      setData((prev) => ({
        ...prev,
        videoFile: file,
        videoUrl: previewUrl, // blob preview only
      }));
    };

    video.onerror = () => {
      showErrorToast("Invalid video file");
    };
  };

  // const uploadToCloudflare = async (file: File) => {
  //   try {
  //     setUploading(true);

  //     const safeFilename = slugifyFilename(file.name);

  //     const res = await fetch(
  //       `${
  //         process.env.NEXT_PUBLIC_API_BASE_URL
  //       }/api/markets/upload-url?filename=${encodeURIComponent(
  //         safeFilename
  //       )}&contentType=${encodeURIComponent(file.type)}`,
  //       { credentials: "include" }
  //     );

  //     if (!res.ok) throw new Error("Failed to get upload URL");

  //     const { putUrl, publicUrl } = await res.json();

  //     const uploadRes = await fetch(putUrl, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": file.type,
  //       },
  //       body: file,
  //     });

  //     if (!uploadRes.ok) throw new Error("Failed to upload video");

  //     setData((prev) => ({
  //       ...prev,
  //       videoUrl: publicUrl,
  //     }));

  //     showSuccessToast("Video uploaded successfully");
  //   } catch (err) {
  //     console.error(err);
  //     showErrorToast("Video upload failed");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // const handleDrop = (files: File[]) => {
  //   const file = files[0];
  //   if (!file) return;

  //   if (file.size > MAX_VIDEO_SIZE) {
  //     showErrorToast("Video size must be 15MB or less");
  //     return;
  //   }

  //   const video = document.createElement("video");
  //   video.preload = "metadata";
  //   video.src = URL.createObjectURL(file);

  //   video.onloadedmetadata = () => {
  //     URL.revokeObjectURL(video.src);

  //     if (video.duration > 15) {
  //       showErrorToast("Video length must be 15 seconds or less");
  //       return;
  //     }

  //     uploadToCloudflare(file);
  //   };

  //   video.onerror = () => {
  //     showErrorToast("Invalid video file");
  //   };
  // };
  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    validateAndSetVideo(file);
  };

  return (
    <div className="relative flex flex-col gap-3 max-w-96">
      {/* ✅ Video exists → Preview */}
      {data.videoUrl ? (
        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            setData((p) => {
              if (p.videoUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(p.videoUrl);
              }
              return { ...p, videoUrl: "", videoFile: null };
            })
          }
          className="
          group relative w-full overflow-hidden
          rounded-xl border border-neutral-800
          bg-neutral-900
        "
        >
          <video
            src={data.videoUrl}
            controls
            className="h-44 w-full object-cover rounded-xl"
            autoPlay
            muted
            loop
          />

          {/* Uploading Overlay */}
          {uploading && (
            <div
              className="absolute inset-0 flex items-center justify-center
        bg-black/50 opacity-0
        transition-opacity duration-300
        group-hover:opacity-100"
            >
              <PuffLoader color="#ac6efc" size={50} />
            </div>
          )}

          {/* Replace Overlay */}
          {!uploading && (
            <div
              className="
              absolute inset-0 flex items-center justify-center
              bg-black/10 opacity-0
              transition-opacity duration-300
              group-hover:opacity-100
            "
            >
              <div className="flex flex-col items-center gap-2 text-sm text-white">
                <UploadCloud size={20} />
                <span className="tracking-wide">Replace Video</span>
              </div>
            </div>
          )}
        </button>
      ) : (
        <div className="relative">
          <Dropzone
            accept={{ "video/*": [] }}
            // maxSize={15 * 1024 * 1024}
            minSize={10 * 1024}
            onDrop={handleDrop}
            onError={console.error}
            inputAccept="video/*"
            disabled={uploading}
          >
            {/* <DropzoneEmptyState /> */}
            <DropzoneEmptyState>
              <div className="flex flex-col items-center gap-2 text-center">
                <UploadCloud className="h-6 w-6 text-neutral-400" />

                <p className="text-sm font-medium text-neutral-200">
                  Upload a video
                </p>

                <p className="text-xs text-neutral-400">
                  Drag & drop or click to upload
                </p>

                <p className="text-xs text-neutral-500">
                  MP4, MOV • max 15MB • up to 15s
                </p>
              </div>
            </DropzoneEmptyState>
            <DropzoneContent />
          </Dropzone>

          {uploading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/10">
              <PuffLoader color="#ac6efc" size={50} />
            </div>
          )}
        </div>
      )}

      {uploading && (
        <span className="text-sm text-neutral-400">Uploading video…</span>
      )}
    </div>
  );
};
