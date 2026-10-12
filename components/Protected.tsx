"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer state update to avoid synchronous setState-in-effect lint warnings.
    const timer = window.setTimeout(() => {
      if (sessionStorage.getItem("loggedIn") !== "true")
        router.replace("/login");
      else setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [router]);

  if (!ready)
    return (
      <main className="p-8 text-center text-gray-500">
        Checking demo login...
      </main>
    );
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
