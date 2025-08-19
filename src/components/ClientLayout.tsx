"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/SignedInUser/AppSideBar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isLoaded) return;
    if (isSignedIn) {
      if (pathname.startsWith("/sign-in")) {
        router.push("/");
      }
    } else {
      if (!pathname.startsWith("/sign-in")) {
        router.push("/sign-in");
      }
    }
  }, [mounted, isLoaded, isSignedIn, pathname, router]);

  // Show loading state until component is mounted and Clerk is loaded
  if (!mounted || !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <AppSidebar />
          <main className="pb-20 sm:pb-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
            <header className="flex justify-end items-center p-4 h-8 bg-gradient-to-b from-black/30 to-transparent">
              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </header>
            <div className="max-w-full mx-auto">{children}</div>
          </main>
        </SidebarProvider>
      </SignedIn>

      <SignedOut>
        {/* Only show children on sign-in page, otherwise redirect will handle it */}
        {pathname.startsWith("/sign-in") ? (
          <main className="flex-1">{children}</main>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500"></div>
          </div>
        )}
      </SignedOut>
    </>
  );
}
