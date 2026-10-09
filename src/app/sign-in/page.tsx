
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const requestedPath = params.get("callbackURL") || "/";
      const callbackURL =
        requestedPath.startsWith("/") &&
          !requestedPath.startsWith("//")
          ? requestedPath
          : "/";

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        setErrorMessage(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।"
        );
        return;
      }

      router.push(callbackURL);
      router.refresh();
    } catch {
      setErrorMessage(
        "লগইন করা যায়নি। আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-green-50/70 px-4 py-10 sm:py-14">
      <section className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-9">
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
            🛒
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            আবার স্বাগতম!
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            বাজার দর দেখতে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ইমেইল ঠিকানা
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="আপনার ইমেইল লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="text-xs font-medium text-green-700 hover:text-green-800"
              >
                {showPassword ? "লুকান" : "দেখুন"}
              </button>
            </div>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400">নতুন এখানে?</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <p className="text-center text-sm text-gray-600">
          আপনার অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            সাইন আপ করুন
          </Link>
        </p>

        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          আপনার অ্যাকাউন্টে সাইন ইন করে বাজারের পণ্যের দাম ও
          তুলনা দেখতে পারবেন।
        </p>
      </section>
    </main>
  );
}