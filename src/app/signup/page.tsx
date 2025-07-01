import SignUpForm from "@/components/SignUpForm";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
