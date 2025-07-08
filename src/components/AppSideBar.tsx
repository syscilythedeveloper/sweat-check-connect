"use client";
import React, { useState } from "react";
import {
  UsersRound,
  Home,
  Inbox,
  Search,
  UserRound,
  Medal,
  Headphones,
  NotebookPen,
  BotMessageSquare,
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
import ContactCard from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckInForm from "@/components/CheckInForm";

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
  {
    title: "Plans",
    url: "/plans",
    icon: NotebookPen,
  },
  {
    title: "Discover",
    url: "/discover",
    icon: Search,
  },
  {
    title: "AskAI",
    url: "/askai",
    icon: BotMessageSquare,
  },
];

const AppSideBar = () => {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

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

          <Separator className="mt-10 mb-2" />

          <SidebarGroup>
            <Dialog
              open={isCheckInOpen}
              onOpenChange={setIsCheckInOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-full border-1"
                >
                  Check In
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 m-0 rounded-none border-none [&>button]:hidden">
                <DialogHeader className="sr-only">
                  <DialogTitle>New Post</DialogTitle>
                </DialogHeader>

                {/* Add your check-in form content here */}
                <CheckInForm onClose={() => setIsCheckInOpen(false)} />
              </DialogContent>
            </Dialog>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSideBar;
