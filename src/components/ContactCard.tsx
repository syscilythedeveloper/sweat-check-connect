/*
useUserContext to display user information in a contact card
 
 */
import React from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const ContactCard = () => {
  const { user } = useUser();
  console.log("User data:", user);

  const contactInfo = {
    Image: user?.imageUrl || "/images/user.png",
    username: user?.username || "defaultUser",
    joined: user?.createdAt || "06/01/2025",
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1 mt">
          <Image
            src={contactInfo.Image}
            alt="User Avatar"
            width={45}
            height={45}
            className="rounded-full"
          />
          <div>
            <Link href={`/profile`}>
              <p className="mt-6 text-blue-500 font-medium max-w-[150px] truncate text-sm hover:text-purple-500 transition-colors duration-200">
                @{contactInfo.username}
              </p>
            </Link>
          </div>
        </div>
        <div>
          <CardDescription className="mt-2 text-sm">
            Member Since:{" "}
            {typeof contactInfo.joined === "string"
              ? contactInfo.joined
              : contactInfo.joined.toLocaleDateString()}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ContactCard;
