import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

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
    icon: Inbox,
  },
  {
    title: "Challenges",
    url: "/challenges",
    icon: Calendar,
  },
  {
    title: "Connections",
    url: "/connections",
    icon: Search,
  },

  {
    title: "Shared Playlists",
    url: "/shared-playlists",
    icon: Settings,
  },
  {
    title: "Plans",
    url: "/plans",
    icon: Settings,
  },
  {
    title: "AskAI",
    url: "/askai",
    icon: Settings,
  },
];

const AppSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Sweat Check Connect</h1>
      </SidebarHeader>
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
        <SidebarGroup>
          <Button
            variant="secondary"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
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
