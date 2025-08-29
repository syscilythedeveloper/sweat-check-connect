// src/components/CheckInDialog.tsx
"use client";
import React, { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SoloCheckInForm from "@/components/CheckIn/CheckInForm";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CheckInDialogProps {
  trigger: React.ReactNode;
  className?: string;
}

const CheckInDialog = ({ trigger, className }: CheckInDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger
        asChild
        className={className}
      >
        {trigger}
      </DialogTrigger>
      <DialogTitle className="hidden">Solo Check In</DialogTitle>
      <DialogContent
        className="max-w-none w-screen bg-transparent h-screen p-0 rounded-none border-none flex items-center justify-center [&>button]:hidden"
        aria-describedby={undefined}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800/10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
            <div className="bg-white dark:bg-slate-800/10 p-4 border-b border-gray-200 dark:border-slate-600 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                Check In
              </h2>
            </div>
            <div className="p-2">
              <SoloCheckInForm setShowCheckInForm={setIsOpen} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckInDialog;
