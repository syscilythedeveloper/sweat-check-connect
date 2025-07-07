import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Video, Play, Camera } from "lucide-react";

interface CheckInFormProps {
  onClose: () => void;
}

const CheckInForm = ({ onClose }: CheckInFormProps) => {
  const [mood, setMood] = useState("");
  const [workoutStatus, setWorkoutStatus] = useState("");
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleVideoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check file size limit (50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Video must be less than 50MB");
      return;
    }

    // Check file type
    const allowedVideoTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];
    if (!allowedVideoTypes.includes(file.type)) {
      alert("Please record in a supported format (MP4, WebM, OGG, MOV)");
      return;
    }

    setMedia(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const openVideoCamera = () => {
    videoInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("mood", mood);
      formData.append("workoutStatus", workoutStatus);
      formData.append("caption", caption);

      if (media) {
        formData.append("media", media);
        formData.append("mediaType", "video");
      }

      const response = await fetch("/api/checkins", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Check-in submitted successfully!");
        onClose();
      } else {
        throw new Error("Failed to submit check-in");
      }
    } catch (error) {
      console.error("Error submitting check-in:", error);
      alert("Failed to submit check-in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Hidden video input for recording only */}
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        onChange={handleVideoCapture}
        className="hidden"
      />

      {/* Media Recording Section */}
      <div className="space-y-3">
        <Label>Record Workout Video Check-In</Label>

        {!mediaPreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              Record a short video to check in your workout progress
            </p>
            <Button
              type="button"
              onClick={openVideoCamera}
              className="flex items-center justify-center gap-2 mx-auto"
            >
              <Video className="h-4 w-4" />
              Record Check In
            </Button>
            <div className="mt-3 text-xs text-gray-500">
              Videos: MP4, WebM, MOV up to 50MB
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <div className="relative w-full h-full">
                <video
                  src={mediaPreview}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Play className="h-12 w-12 text-white opacity-80" />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={removeMedia}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Caption Section */}
      <div className="space-y-2">
        <Label htmlFor="caption">Caption</Label>
        <Textarea
          id="caption"
          placeholder="Share your workout experience, goals, or motivation..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Mood Selection */}
      <div className="space-y-2">
        <Label htmlFor="mood">How are you feeling?</Label>
        <Select
          value={mood}
          onValueChange={setMood}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="energized">⚡ Energized</SelectItem>
            <SelectItem value="motivated">💪 Motivated</SelectItem>
            <SelectItem value="accomplished">🏆 Accomplished</SelectItem>
            <SelectItem value="tired">😴 Tired</SelectItem>
            <SelectItem value="sore">🤕 Sore</SelectItem>
            <SelectItem value="relaxed">😌 Relaxed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Workout Status */}
      <div className="space-y-2">
        <Label htmlFor="workout">Workout Status</Label>
        <Select
          value={workoutStatus}
          onValueChange={setWorkoutStatus}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select workout status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">✅ Completed Workout</SelectItem>
            <SelectItem value="in-progress">
              🏃 Currently Working Out
            </SelectItem>
            <SelectItem value="planned">📅 Planned for Later</SelectItem>
            <SelectItem value="rest-day">🛌 Rest Day</SelectItem>
            <SelectItem value="skipped">❌ Skipped Today</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !caption.trim()}
          className="min-w-[100px]"
        >
          {isSubmitting ? "Posting..." : "Post Check-In"}
        </Button>
      </div>
    </form>
  );
};

export default CheckInForm;
