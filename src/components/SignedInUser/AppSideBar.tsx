"use client";
import React from "react";
import { UsersRound, Home, Medal, Camera, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

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

const AppSideBar = () => {
  const pathname = usePathname();

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
      title: "Check In",
      icon: Camera,
      isDialog: true, // This indicates that this item opens a dialog
    },
    // {
    //   title: "Messages",
    //   url: "/messages",
    //   icon: Inbox,
    // },
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
          <SidebarGroup className="bg-sidebar-accent-foreground border border-transparent rounded-2xl mt-4 mb-2 shadow-purple-glow">
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="flex items-center justify-end px-2 ">
                  <ModeToggle />
                </div>
                <Separator className=" bg-secondary" />
                <div className="space-y-3">
                  {items.map(
                    (item) =>
                      !item.isDialog && ( // Exclude dialog items from the sidebar menu
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a
                              href={item.url}
                              className={`${
                                pathname === item.url
                                  ? "bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-purple-800 rounded-lg shadow-purple-glow"
                                  : ""
                              } flex items-center gap-2 px-2 py-1`}
                            >
                              <item.icon />
                              <span className="text-lg font-small text-gray-900 dark:text-white">
                                {item.title}
                              </span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                  )}
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

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 flex justify-between items-center py-2 px-1 rounded-t-lg shadow-purple-glow sm:hidden">
        {items.map((item) =>
          item.isDialog ? (
            <CheckInDialog
              key={item.title}
              trigger={
                <button className=" flex flex-col items-center text-white hover:text-blue-400 transition px-2 py-2 rounded-3xl">
                  {item.icon &&
                    React.createElement(item.icon, {
                      className: "w-3.5 h-3.5 mb-0.5",
                    })}
                  <span className="text-[9px]">{item.title}</span>
                </button>
              }
            />
          ) : (
            <a
              key={item.title}
              href={item.url}
              className={`flex flex-col items-center text-white hover:text-blue-400 transition px-2 py-2 rounded-3xl
                ${
                  pathname === item.url
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-purple-800"
                    : ""
                }`}
            >
              {item.icon &&
                React.createElement(item.icon, {
                  className: "w-3.5 h-3.5 mb-0.5",
                })}
              <span className="text-[9px]">{item.title}</span>
            </a>
          )
        )}
      </nav>
    </>
  );
};

export default AppSideBar;
