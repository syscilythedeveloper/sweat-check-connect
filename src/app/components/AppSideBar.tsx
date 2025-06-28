import React from "react";
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
import { Separator } from "@/components/ui/separator";
import ContactCard from "@/components/contactcard";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
  {
    title: "Messsages",
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
  return (
    <Sidebar className="bg-gray-100 ">
      <SidebarHeader>
        <ContactCard />
      </SidebarHeader>
      <Separator className="my-8" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
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
          <Button
            variant="secondary"
            className="w-full border-1 "
          >
            Check In
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
