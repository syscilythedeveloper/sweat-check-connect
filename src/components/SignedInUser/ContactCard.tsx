/*
useUserContext to display user information in a contact card
 
 */
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const ContactCard = () => {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading skeleton until component is mounted and user data is loaded
  if (!mounted || !isLoaded) {
    return (
      <Card className="bg-sidebar-accent-foreground dark:bg-slate-800 shadow-[0_0_10px_2px_rgba(168,85,247,0.2)] border border-transparent rounded-2xl p-4">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="rounded-full bg-gray-300 dark:bg-gray-600 w-[40px] h-[40px] ring-2 ring-purple-200 dark:ring-purple-600 animate-pulse" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-16" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const contactInfo = {
    Image: user?.imageUrl || "/images/user.png",
    username: user?.username || "defaultUser",
    name: user?.fullName || user?.firstName || "User",
    joined: user?.createdAt || "06/01/2025",
  };

  return (
    <Card className="bg-sidebar-accent-foreground dark:bg-slate-800 shadow-[0_0_10px_2px_rgba(168,85,247,0.2)] border border-transparent rounded-2xl p-4">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={contactInfo.Image}
                alt="User Avatar"
                width={48}
                height={48}
                className="rounded-full object-cover w-[40px] h-[40px] ring-2 ring-purple-200 dark:ring-purple-600"
              />
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              {contactInfo.name != "User" && (
                <h3 className="font-bold text-sm text-gray-900 dark:text-white ">
                  {contactInfo.name}
                </h3>
              )}
              <Link href={`/profile/${contactInfo.username}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{contactInfo.username}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ContactCard;
