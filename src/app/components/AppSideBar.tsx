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
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
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

      <SidebarContent className="mt-4">
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
        <SidebarGroup>
          <Button
            variant="secondary"
            className="w-full bg-green-500 hover:bg-green-600 text-white mt-30 border-1 border-green-600 shadow-lg"
          >
            Check In
          </Button>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p>© 2023 Sweat Check Connect</p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
