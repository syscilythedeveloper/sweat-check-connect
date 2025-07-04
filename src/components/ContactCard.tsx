import React from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ContactCard = () => {
  const contactInfo = {
    Image: "/images/user.png",
    username: "sys_thealchemist",
    joined: "06/01/2025",
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
            Member Since: {contactInfo.joined}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ContactCard;
