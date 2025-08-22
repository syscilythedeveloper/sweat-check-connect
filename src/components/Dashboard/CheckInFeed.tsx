/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import DashboardCheckIn from "./CheckIns";

interface CheckInFeedProps {
  checkIns: any[];
  onStatusChange?: (username: string, status: string) => void;
}

const DashboardCheckInFeed = ({ checkIns, onStatusChange }: CheckInFeedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeIndex = Math.max(0, Math.min(currentIndex, checkIns.length - 1));
  const scrollingRef = useRef(false);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedUp: () =>
      setCurrentIndex((i) => Math.min(i + 1, checkIns.length - 1)),
    onSwipedDown: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  // Mouse wheel handler
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (scrollingRef.current) return;
      scrollingRef.current = true;

      if (e.deltaY > 0) {
        setCurrentIndex((i) => Math.min(i + 1, checkIns.length - 1));
      } else if (e.deltaY < 0) {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }

      setTimeout(() => {
        scrollingRef.current = false;
      }, 350);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [checkIns.length]);

  // Arrow key navigation (optional but feels great)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setCurrentIndex((i) => Math.min(i + 1, checkIns.length - 1));
      } else if (e.key === "ArrowUp") {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [checkIns.length]);

  return (
    <div
      {...handlers}
      className="w-full h-full relative bg-background dark:bg-slate-800/60 rounded-xl overflow-hidden"
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "none",
      }}
    >
      {checkIns.length > 0 && (
        <DashboardCheckIn
          key={checkIns[safeIndex].id}
          {...checkIns[safeIndex]}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
};

export default DashboardCheckInFeed;
