import React, { useState, useRef } from "react";
import {
  Camera,
  UploadCloud,
  Video,
  Globe,
  Users,
  Lock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);

      // Create a temporary video element to get dimensions
      const tempVideo = document.createElement("video");
      tempVideo.src = url;
      tempVideo.onloadedmetadata = () => {};
    } else {
      setVideoFile(null);
      setVideoPreviewUrl(null);

      console.error("Please upload a valid video file.");
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
        alert("Workout check-in posted!");
        setCaption("");
        setPrivacy("public");
        handleRemoveVideo();
        onClose();
      } else {
        throw new Error("Failed to submit check-in");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit check-in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-start justify-center p-2 sm:p-4 font-sans">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto mt-4 sm:mt-8 relative">
        {/* ... existing close button and title ... */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
        >
          {/* Upload Area */}
          <div
            className="relative border-2 border-dashed border-purple-400 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center cursor-pointer hover:bg-purple-50 transition-colors"
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
              <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="max-w-full max-h-full object-contain rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
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
                <UploadCloud
                  size={40}
                  className="text-gray-400 mb-2 sm:mb-3 sm:w-12 sm:h-12"
                />
                <p className="text-gray-700 font-semibold text-base sm:text-lg">
                  Upload Your Workout Video
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Drag & drop or click to browse
                </p>
              </div>
            )}
          </div>

          {/* Caption */}
          <div>
            <label
              htmlFor="caption"
              className="text-gray-700 text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Camera size={16} /> Caption Your Workout
            </label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="What did you achieve today? Share your progress and thoughts!"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-sm sm:text-base"
            ></textarea>
          </div>

          {/* Privacy */}
          <div>
            <label className="text-gray-700 text-sm font-medium mb-2 flex items-center gap-2">
              <Lock size={16} /> Who can see this?
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={privacy === "public"}
                  onChange={() => setPrivacy("public")}
                  className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-purple-600"
                />
                <span className="ml-2 text-gray-800 flex items-center gap-1 text-sm sm:text-base">
                  <Globe
                    size={14}
                    className="sm:w-4 sm:h-4"
                  />{" "}
                  Public
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="friends"
                  checked={privacy === "friends"}
                  onChange={() => setPrivacy("friends")}
                  className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-purple-600"
                />
                <span className="ml-2 text-gray-800 flex items-center gap-1 text-sm sm:text-base">
                  <Users
                    size={14}
                    className="sm:w-4 sm:h-4"
                  />{" "}
                  Friends Only
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={privacy === "private"}
                  onChange={() => setPrivacy("private")}
                  className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-purple-600"
                />
                <span className="ml-2 text-gray-800 flex items-center gap-1 text-sm sm:text-base">
                  <Lock
                    size={14}
                    className="sm:w-4 sm:h-4"
                  />{" "}
                  Private
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !caption.trim()}
              className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
            >
              <Video
                size={20}
                className="sm:w-6 sm:h-6"
              />
              {isSubmitting ? "Posting..." : "Post Workout"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckInForm;
