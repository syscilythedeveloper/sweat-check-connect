"use client";
import React from "react";
import {
  UsersRound,
  Home,
  Inbox,
  UserRound,
  Medal,
  Headphones,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import CheckInDialog from "@/components/CheckIn/CheckInDialog";
import ContactCard from "@/components/SignedInUser/ContactCard";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/SignedInUser/mode-toggle";
import QuickStats from "./QuickStats";
import { useUser } from "@clerk/nextjs";

const AppSideBar = () => {
  const { user } = useUser();

  // Menu items.
  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Profile",
      url: `/profile/${user?.username || "defaultUser"}`,
      icon: UserRound,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: Inbox,
    },
    {
      title: "Challenges",
      url: "/challenges",
      icon: Medal,
    },
    {
      title: "Connections",
      url: "/connections",
      icon: UsersRound,
    },
    {
      title: "Shared Playlists",
      url: "/shared-playlists",
      icon: Headphones,
    },
  ];
  return (
    <>
      <Toaster />

      <Sidebar className="border border-transparent bg-transparent dark:bg-slate-900 rounded-2xl shadow-[0_0_20px_8px_rgba(63,23,154,0.3)]  p-4 space-y-4">
        <SidebarHeader className="space-y-2">
          <ContactCard />
          <QuickStats />
        </SidebarHeader>
        <Separator className="my-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[1px]" />

        <SidebarContent>
          <SidebarGroup className="bg-gray-100 dark:bg-slate-800 shadow-[0_0_10px_2px_rgba(168,85,247,0.4)] border border-transparent rounded-2xl mt-4 mb-2">
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="flex items-center justify-end px-2 ">
                  <ModeToggle />
                </div>
                <Separator className=" bg-secondary" />
                <div className="space-y-3">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span className="text-lg font-small text-gray-900 dark:text-white">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="my-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[1px]" />

          <CheckInDialog
            trigger={
              <Button
                variant="outline"
                className="w-full text-sm py-2 border border-purple-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all dark:shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]"
              >
                Check In
              </Button>
            }
          />
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSideBar;
