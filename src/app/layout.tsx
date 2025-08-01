import { type Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/SignedInUser/AppSideBar";
import { ThemeProvider } from "@/components/SignedInUser/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweat Check Connect",
  description: "Your hub for fitness challenges, shared playlists, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div suppressHydrationWarning>
              <SignedIn>
                <SidebarProvider>
                  <AppSidebar />
                  <main className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                {/* Keep separate header for signed out users */}

                <main className="flex-1">{children}</main>
              </SignedOut>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
