// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import AppSidebar from "@/components/AppSideBar";
// import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "@/components/mode-toggle";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Sweat Check Connect",
//   description: "Other names: SweatSync, ",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       suppressHydrationWarning
//     >
//       <head />
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <SidebarProvider>
//             <AppSidebar />
//             <main className="flex-1">
//               <div className="flex justify-between items-center p-4">
//                 <SidebarTrigger />
//                 <ModeToggle />
//               </div>
//               {children}
//             </main>
//           </SidebarProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Signed In: Show sidebar layout */}
            <SignedIn>
              <SidebarProvider>
                <AppSidebar />
                <main className="flex-1">
                  <div className="flex justify-between items-center p-4">
                    <SidebarTrigger />
                    {/* <ModeToggle /> */}
                  </div>
                  {children}
                </main>
              </SidebarProvider>
            </SignedIn>

            {/* Signed Out: Show full-width layout without sidebar */}
            <SignedOut>
              <main className="flex-1">
                {/* <div className="flex justify-end items-center p-4">
                  <ModeToggle />
                </div> */}
                {children}
              </main>
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
