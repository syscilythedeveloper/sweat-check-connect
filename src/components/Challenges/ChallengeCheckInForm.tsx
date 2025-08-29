import React, { useState, useRef } from "react";
import { Video, X, BicepsFlexed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { postCheckIn } from "@/utils/checkInFunctions";
import toast from "react-hot-toast";

interface ChallengeCheckInFormProps {
  challengeId: string;
  setShowCheckInForm: (show: boolean) => void;
}

const ChallengeCheckInForm = ({
  challengeId,
  setShowCheckInForm,
}: ChallengeCheckInFormProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Video must be less than 100MB");
        return;
      }

      // Create a temporary video element to check duration
      const tempVideo = document.createElement("video");
      const url = URL.createObjectURL(file);
      tempVideo.src = url;

      tempVideo.onloadedmetadata = () => {
        const duration = tempVideo.duration;

        if (duration > 120) {
          toast.error(
            `Video too long (${duration.toFixed(
              1
            )}s). Please reupload a video less than 2 minutes long.`,
            {
              duration: 4000,
              position: "top-center",
              style: {
                background: "#ef4444",
                color: "white",
              },
              icon: "⏱️",
            }
          );
          URL.revokeObjectURL(url);
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        toast.success(`Perfect! Video meets requirements`, {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "white",
          },
          icon: (
            <BicepsFlexed
              size={16}
              className="text-white"
            />
          ),
        });
        setVideoFile(file);
        setVideoPreviewUrl(url);
        console.log(`✅ Video duration: ${duration.toFixed(1)} seconds`);
      };

      tempVideo.onerror = () => {
        toast.error("Error loading video file", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "white",
          },
        });
        URL.revokeObjectURL(url);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
    } else {
      toast.error("Please upload a valid video file", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "white",
        },
      });
      setVideoFile(null);
      setVideoPreviewUrl(null);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreviewUrl(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!videoFile) {
      toast.error("Please upload a video before submitting.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "white",
        },
      });
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("challengeId", challengeId);
    formData.append("caption", caption);

    // postCheckIn
    const checkinresponse = await postCheckIn(formData);
    console.log("Check-in response:", checkinresponse);

    setIsSubmitting(false);
    setShowCheckInForm(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-white dark:bg-blue-800/15 rounded-lg sm:rounded-3xl sm:shadow-2xl p-2 sm:p-6 md:p-8 w-full max-w-md mx-auto mt-4 sm:mt-8 relative border border-gray-100 dark:border-slate-700/15 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
        >
          {/* Upload Area */}
          <div
            className="relative rounded-sm sm:rounded-xl p-4 sm:p-6 text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-900 transition-colors"
            onClick={() => !videoFile && fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="video/*"
              capture="environment"
              onChange={handleVideoChange}
              ref={fileInputRef}
              className="hidden"
            />
            {videoPreviewUrl ? (
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-slate-700"
                >
                  Your browser does not support the video tag.
                </video>
                {isSubmitting && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                    <svg
                      className="animate-spin h-12 w-12 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVideo();
                  }}
                  className="absolute border border-none top-0.5 right-0.5 bg-red-900/60 text-red-900 rounded-full  shadow hover:bg-red-600 transition"
                  aria-label="Remove video"
                >
                  <X size={3} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Video
                  size={50}
                  className="rounded-full bg-purple-500/10 p-4 animate-pulse"
                />
                <p className="text-gray-700 dark:text-gray-200 font-semibold text-base sm:text-lg">
                  Upload Your Workout Video
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                  Tap to upload
                </p>
              </div>
            )}
          </div>
          <div className="text-center"></div>

          {/* Caption */}
          <div>
            <label
              htmlFor="caption"
              className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-1 flex items-center gap-2"
            ></label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              required
              placeholder="Enter caption"
              className="w-full p-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-sm sm:text-base text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-slate-900"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowCheckInForm(false)}
              className="flex-[1] bg-red-500/50 text-[8px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              disabled={isSubmitting || !caption.trim() || !videoFile}
              className="flex-[7] bg-blue-800/50 border border-blue-600 text-xs "
            >
              {isSubmitting ? "Posting..." : "Post Workout"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChallengeCheckInForm;
