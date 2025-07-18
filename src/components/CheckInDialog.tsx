// src/components/CheckInDialog.tsx
"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckInForm from "@/components/CheckInForm";

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
      <DialogContent className="max-w-none w-screen h-screen p-0 mt-15 rounded-none border-none flex items-center justify-center [&>button]:hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>New Post</DialogTitle>
        </DialogHeader>
        <CheckInForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CheckInDialog;
