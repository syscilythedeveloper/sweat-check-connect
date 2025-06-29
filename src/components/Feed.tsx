"use client";
import React from "react";
import { useEffect, useState } from "react";
import CheckInPost from "@/components/CheckInPost";
import { Post } from "@/types/post"; // Assuming you have a Post type defined in a types file

const Feed = () => {
  const [data, setData] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log("Fetched data:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex-1 space-y-3">
      {data && Array.isArray(data) && (
        <>
          {data.map(
            (post: Post) =>
              post.user && (
                <CheckInPost
                  key={post.id}
                  post={post}
                />
              )
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
