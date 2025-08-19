"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Medal, Camera, UserRound } from "lucide-react";
import CheckInDialog from "@/components/CheckIn/CheckInDialog";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Profile", url: "/profile", icon: UserRound },
  { title: "Check In", icon: Camera, isDialog: true },
  { title: "Challenges", url: "/challenges", icon: Medal },
];

function NavLink({
  href,
  isActive,
  children,
  className = "",
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${className} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl`}
    >
      {children}
    </Link>
  );
}

export default function AppNav() {
  const pathname = usePathname();

  // Height of bottom bar; use this on pages to pad bottom content.
  const bottomBarHeight = "3.5rem"; // 56px

  return (
    <>
      {/* TOP NAV (tablet/desktop) */}
      <nav
        role="navigation"
        aria-label="Primary"
        className="hidden sm:flex sticky top-0 z-40 h-14 items-center justify-center gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60"
      >
        <div className="w-full max-w-5xl px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((item) =>
              item.isDialog ? (
                <CheckInDialog
                  key={item.title}
                  trigger={
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition
                                 min-h-[44px] min-w-[44px]"
                      aria-label="Open Check In dialog"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span className="hidden md:inline">{item.title}</span>
                      </div>
                    </button>
                  }
                />
              ) : (
                <NavLink
                  key={item.title}
                  href={item.url!}
                  isActive={pathname === item.url}
                  className={`px-3 py-2 min-h-[44px] min-w-[44px] 
                    ${
                      pathname === item.url
                        ? "text-blue-600 dark:text-blue-300"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5" />
                    {/* Label hidden on small, shown on md+ */}
                    <span className="hidden md:inline text-sm">
                      {item.title}
                    </span>
                  </div>
                  {/* Active indicator */}
                  <span
                    className={`block h-0.5 mt-1 rounded-full transition-[width] duration-200
                      ${
                        pathname === item.url
                          ? "w-full bg-blue-600 dark:bg-blue-400"
                          : "w-0 bg-transparent"
                      }
                    `}
                  />
                </NavLink>
              )
            )}
          </div>
        </div>
      </nav>

      {/* BOTTOM NAV (mobile) */}
      <nav
        role="navigation"
        aria-label="Primary"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 
                   bg-slate-900/80 backdrop-blur-md shadow-purple-glow"
        style={{
          height: bottomBarHeight,
          paddingBottom: "max(0px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="h-full grid grid-cols-4 overflow-x-auto overscroll-x-contain snap-x">
          {items.map((item) =>
            item.isDialog ? (
              <div
                key={item.title}
                className="flex items-center justify-center"
              >
                <CheckInDialog
                  trigger={
                    // Mobile FAB-like pill
                    <button
                      type="button"
                      className="flex flex-col items-center justify-center text-white transition px-3 py-2 rounded-2xl
                                 min-h-[44px] min-w-[44px] hover:text-blue-400"
                      aria-label="Open Check In dialog"
                    >
                      <item.icon className="w-5 h-5 mb-0.5" />
                      <span className="text-[10px]">Check In</span>
                    </button>
                  }
                />
              </div>
            ) : (
              <div
                key={item.title}
                className="flex items-center justify-center"
              >
                <NavLink
                  href={item.url!}
                  isActive={pathname === item.url}
                  className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl snap-center
                    min-h-[44px] min-w-[44px] transition
                    ${
                      pathname === item.url
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-purple-800 text-white"
                        : "text-white hover:text-blue-400"
                    }`}
                >
                  <item.icon className="w-5 h-5 mb-0.5" />
                  {/* Label hidden on very small screens; show from ~360px wide */}
                  <span className="text-[10px] sm:text-xs">{item.title}</span>
                </NavLink>
              </div>
            )
          )}
        </div>
      </nav>
    </>
  );
}
