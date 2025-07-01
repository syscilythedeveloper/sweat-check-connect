import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, MessageCircle, Repeat2, MapPin } from "lucide-react";
import { Post } from "@/types/post";
import Link from "next/link";

interface CheckInPostProps {
  post: Post;
}

const CheckInPost = ({ post }: CheckInPostProps) => {
  if (!post || !post.user) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="w-full max-w-lg mx-auto">
      {/* Header */}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={post.user.profilePhoto}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover aspect-square"
            />

            <div>
              <Link href={`/profile/${post.user.username}`}>
                <p className="font-semibold text-sm hover:text-blue-500">
                  @{post.user.username}
                </p>
              </Link>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                {post.location} • {post.timestamp}
              </div>
            </div>
          </div>
          <div className="w-28 bg-secondary text-primary-foreground text-xs backdrop-blur-sm shadow-lg rounded-lg align-text-right">
            {post.focus}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 border-1 border-gray-200 rounded-lg">
        <div className="relative ">
          {post.mediaType === "video" ? (
            <video
              src={post.image} // or post.videoUrl
              controls
              loop
              className="w-full aspect-[4/3] object-contain shadow-lg rounded-lg"
              // Optional thumbnail
            />
          ) : (
            <Image
              src={post.image}
              alt="Gym post"
              width={400}
              height={400}
              loading="lazy"
              className="w-full aspect-[4/3] object-contain shadow-lg rounded-lg"
            />
          )}
        </div>

        {/* Caption and Actions */}
        <div className="p-4 space-y-3">
          <p className="text-sm leading-relaxed">{post.caption}</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <Heart
                className={`w-4 h-4 mr-1 ${
                  post.liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {post.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <Repeat2 className="w-4 h-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInPost;
