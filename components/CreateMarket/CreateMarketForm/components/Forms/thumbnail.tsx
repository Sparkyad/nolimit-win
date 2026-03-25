"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { useRef, useState } from "react";
import { MarketFormData } from "../../View/create-market-view";
import { UploadCloud } from "lucide-react";
import { showErrorToast } from "../form-toasts";
import { PuffLoader } from "react-spinners";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MIN_IMAGE_SIZE = 5 * 1024;

export const ThumbnailDropzone = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [uploading] = useState(false);


  const [cropOpen, setCropOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);


  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 45,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  const validateAndOpenCrop = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      showErrorToast("Image size must be 3MB or less");
      return;
    }

    if (file.size < MIN_IMAGE_SIZE) {
      showErrorToast("Invalid image file");
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setTempImage(blobUrl);
    setCropOpen(true);
  };


  const getCroppedFile = async (
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<File> => {
    const canvas = document.createElement("canvas");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas error");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          resolve(
            new File([blob], "thumbnail.jpg", {
              type: "image/jpeg",
            })
          );
        },
        "image/jpeg",
        0.9
      );
    });
  };


  const handleCropConfirm = async () => {
    if (!completedCrop || !imgRef.current) return;

    const croppedFile = await getCroppedFile(
      imgRef.current,
      completedCrop
    );

    const previewUrl = URL.createObjectURL(croppedFile);

    setData((prev) => ({
      ...prev,
      imageFile: croppedFile,
      imageUrl: previewUrl,
    }));

    if (tempImage) URL.revokeObjectURL(tempImage);
    setTempImage(null);
    setCropOpen(false);
  };


  const handleDrop = (files: File[]) => {
    if (uploading) return;
    const file = files[0];
    if (!file) return;
    validateAndOpenCrop(file);
  };

  const handleReuploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <div className="relative flex flex-col gap-2">
        <span className="text-neutral-300 font-medium tracking-wider">
          Image
        </span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            validateAndOpenCrop(file);
          }}
        />

        {data.imageUrl ? (
          <button
            type="button"
            onClick={handleReuploadClick}
            className="group relative w-full max-w-96 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
          >
            <img
              src={data.imageUrl}
              alt="Thumbnail preview"
              className="h-44 w-full object-cover transition-transform group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex flex-col items-center gap-2 text-sm text-white">
                <UploadCloud size={20} />
                <span>Replace Image</span>
              </div>
            </div>
          </button>
        ) : (
          <div className="flex flex-col max-w-96 relative">
            <Dropzone
              maxSize={3 * 1024 * 1024}
              minSize={5 * 1024}
              onDrop={handleDrop}
              accept={{ "image/*": [] }}
            >
              <DropzoneEmptyState>
                <div className="flex flex-col items-center gap-2 text-center">
                  <UploadCloud className="h-6 w-6 text-neutral-400" />
                  <p className="text-sm font-medium text-neutral-200">
                    Upload an image
                  </p>
                  <p className="text-xs text-neutral-400">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-neutral-500">
                    JPG, PNG, WEBP • max 3MB
                  </p>
                </div>
              </DropzoneEmptyState>
              <DropzoneContent />
            </Dropzone>
          </div>
        )}
      </div>


      <Dialog open={cropOpen} onOpenChange={setCropOpen}>
        <DialogContent className="bg-neutral-950 border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-sm text-neutral-300">
              Crop image
            </DialogTitle>
          </DialogHeader>

          {tempImage && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={16 / 9}
            >
              <img ref={imgRef} src={tempImage} alt="Crop" />
            </ReactCrop>
          )}

          <DialogFooter>
            <Button variant="marketGradient" onClick={handleCropConfirm}>
              Crop & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
