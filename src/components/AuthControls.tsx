
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AuthControls() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out failed:", error.message);
        return;
      }

      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/sign-in"
          className="whitespace-nowrap py-2 text-[11px] font-semibold text-gray-800 hover:text-green-700 sm:text-[13px]"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-green-800 sm:px-4 sm:py-2 sm:text-[13px]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const displayName = user.name?.trim() || user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        className="flex max-w-[190px] items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-2 hover:bg-green-50 sm:gap-3 sm:pr-3"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-700 text-sm font-bold text-white">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </span>
        <span className="min-w-0 text-left">
          <span className="block max-w-[100px] truncate text-xs font-semibold text-gray-800 sm:max-w-[130px] sm:text-sm">
            {displayName}
          </span>
          <span className="block text-[10px] text-gray-500 sm:text-xs">
            আমার অ্যাকাউন্ট
          </span>
        </span>
        <span className="text-xs text-gray-500" aria-hidden="true">
          {menuOpen ? "▲" : "▼"}
        </span>
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
            <div className="border-b border-gray-100 px-3 py-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {displayName}
              </p>
              <p className="mt-1 truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="mt-1 block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50"
            >
              🏠 হোম পেজ
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}