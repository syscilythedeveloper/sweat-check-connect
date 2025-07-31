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

      <Sidebar className="border border-transparent  dark:bg-slate-900 rounded-2xl shadow-purple-glow  p-4 space-y-4">
        <SidebarHeader className="space-y-2 ">
          <ContactCard />
          <QuickStats />
        </SidebarHeader>
        <Separator className="my-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-[1px]" />

        <SidebarContent>
          <SidebarGroup className="bg-sidebar-accent border border-transparent rounded-2xl mt-4 mb-2 shadow-purple-glow">
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
            trigger={<Button variant="outline">Check In</Button>}
          />
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSideBar;
