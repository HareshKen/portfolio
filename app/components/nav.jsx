"use client";

import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "./loading-indicator";
import ThemeToggle from "./ThemeToggle"; // ✅ import correctly

export const Navigation = () => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const searchParams = useSearchParams();
  const customUsername = searchParams.get("customUsername");

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/50 border-zinc-800"
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          {/* Left side: Back button */}
          <Link
            href={"/" + (customUsername ? `?customUsername=${customUsername}` : "")}
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <GoArrowLeft className="w-6 h-6" />
          </Link>

          {/* Right side: Nav links + Theme Toggle */}
          <div className="flex items-center gap-6 text-base">
            <Link
              href={
                "/projects" + (customUsername ? `?customUsername=${customUsername}` : "")
              }
              className="duration-200 text-zinc-400 hover:text-zinc-100 relative block"
            >
              <span className="inline-flex items-center">
                Projects <LoadingIndicator />
              </span>
            </Link>
            <Link
              href={
                "/contact" + (customUsername ? `?customUsername=${customUsername}` : "")
              }
              className="duration-200 text-zinc-400 hover:text-zinc-100 relative block"
            >
              <span className="inline-flex items-center">
                Contact <LoadingIndicator />
              </span>
            </Link>

            {/* ✅ Dark/Light mode toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
