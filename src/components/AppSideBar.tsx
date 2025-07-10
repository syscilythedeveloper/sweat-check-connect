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
import CheckInDialog from "@/components/CheckInDialog";
import ContactCard from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
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

const AppSideBar = () => {
  return (
    <>
      <Toaster />
      <Sidebar className="bg-gray-100">
        <SidebarHeader>
          <ContactCard />
        </SidebarHeader>
        <Separator className="mt-4" />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="flex items-center justify-end px-2 py-2">
                  <ModeToggle />
                </div>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="mt-20 mb-2" />

          <SidebarGroup>
            <CheckInDialog
              trigger={
                <Button
                  variant="secondary"
                  className="w-full border-1"
                >
                  Check In
                </Button>
              }
            />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSideBar;
