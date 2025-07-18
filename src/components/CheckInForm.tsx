// [to do] - add in toast message for if a user needs to sign out and back in
//[] add in spinner while check in posts

import React, { useState, useRef } from "react";
import {
  Camera,
  Video,
  Globe,
  Users,
  Lock,
  X,
  BicepsFlexed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const CheckInForm = ({ onClose }: { onClose: () => void }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Video must be less than 50MB");
        return;
      }

      // Create a temporary video element to check duration
      const tempVideo = document.createElement("video");
      const url = URL.createObjectURL(file);
      tempVideo.src = url;

      tempVideo.onloadedmetadata = () => {
        const duration = tempVideo.duration;

        // Check if video is between 15-30 seconds
        if (duration < 15) {
          toast.error(
            `Video too short (${duration.toFixed(1)}s). Need 15-30 seconds.`,
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

        if (duration > 30) {
          toast.error(
            `Video too long (${duration.toFixed(1)}s). Need 15-30 seconds.`,
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

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("privacy", privacy);
      if (videoFile) {
        formData.append("media", videoFile);
        formData.append("mediaType", "video");
      }

      const response = await fetch("/api/checkins", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Check-in submitted successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "white",
          },
          icon: "✅",
        });

        setCaption("");
        setPrivacy("public");
        handleRemoveVideo();
        onClose();
      } else {
        throw new Error("Failed to submit check-in");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting check-in. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: { background: "#ef4444", color: "white" },
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto mt-8 sm:mt-8 relative border border-gray-100 dark:border-slate-700">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
        >
          <h5 className="text-2xl text-center sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
            New Post
          </h5>
          {/* Upload Area */}
          <div
            className="relative border-2 border-dashed border-purple-400 dark:border-purple-700 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-900 transition-colors"
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
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="max-w-full max-h-full object-contain rounded-lg"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVideo();
                  }}
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                  aria-label="Remove video"
                >
                  <X
                    size={12}
                    className="text-white"
                  />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Video
                  size={40}
                  className="text-purple-400 dark:text-purple-500 mb-2 sm:mb-3 sm:w-12 sm:h-12"
                />
                <p className="text-gray-700 dark:text-gray-200 font-semibold text-base sm:text-lg">
                  Upload Your Workout Video
                </p>
                <p className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm mt-1 font-medium">
                  Must be 15-30 seconds long
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                  Tap to upload
                </p>
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              📹 Video requirements: 15-30 seconds, max 50MB
            </p>
          </div>

          {/* Caption */}
          <div>
            <label
              htmlFor="caption"
              className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Camera
                size={16}
                className="text-purple-500 dark:text-purple-400"
              />{" "}
              Caption Your Workout
            </label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="What did you achieve today? Share your progress and thoughts!"
              className="w-full p-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-sm sm:text-base text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-slate-900"
            ></textarea>
          </div>

          {/* Privacy */}
          <div>
            <label className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-2 flex items-center gap-2">
              <Lock
                size={16}
                className="text-purple-500 dark:text-purple-400"
              />{" "}
              Who can see this?
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={privacy === "public"}
                  onChange={() => setPrivacy("public")}
                  className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-100 flex items-center gap-1 text-sm sm:text-base">
                  <Globe
                    size={14}
                    className="text-purple-400 dark:text-purple-500 sm:w-4 sm:h-4"
                  />{" "}
                  Public
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="followersOnly"
                  checked={privacy === "followersOnly"}
                  onChange={() => setPrivacy("followersOnly")}
                  className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400"
                />
                <span className="ml-2 text-gray-800 dark:text-gray-100 flex items-center gap-1 text-sm sm:text-base">
                  <Users
                    size={14}
                    className="text-purple-400 dark:text-purple-500 sm:w-4 sm:h-4"
                  />{" "}
                  Followers Only
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !caption.trim() || !videoFile}
              className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
            >
              <Video
                size={20}
                className="text-white sm:w-6 sm:h-6"
              />
              {isSubmitting ? "Posting..." : "Post Workout"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border bg-red-200 dark:bg-red-900 border-gray-100 dark:border-red-900 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-red-500 dark:hover:bg-red-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckInForm;
