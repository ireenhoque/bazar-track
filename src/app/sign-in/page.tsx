
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

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
          !requestedPath.startsWith("//") &&
          !requestedPath.includes("\\")
          ? requestedPath
          : "/";

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL,
      });

      if (error) {
        setErrorMessage(
          error.message ||
          "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।"
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
    <main className="flex min-h-[65vh] w-full items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:py-12">
      <div className="w-full max-w-md">
        <header className="mb-5 text-center">
          <h1 className="text-xl font-bold text-[#253129] sm:text-2xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            নিরাপদে লগ ইন করুন এবং বাজারের দর দেখুন।
          </p>
        </header>

        <section className="rounded-xl border border-[#e1e9e1] bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="signin-email"
                className="mb-1 block text-xs font-medium text-[#253129]"
              >
                ইমেইল
              </label>

              <input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-md border border-[#e1e9e1] bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between gap-3">
                <label
                  htmlFor="signin-password"
                  className="text-xs font-medium text-[#253129]"
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
                id="signin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-md border border-[#e1e9e1] bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-xs leading-5 text-red-600"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="mt-4">
            <SocialLoginButtons />
          </div>
        </section>

        <p className="mt-4 text-center text-xs text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>

        <p className="mt-3 text-center text-xs leading-5 text-gray-400">
          সাইন ইন করে বাজারের পণ্যের দাম ও তুলনা দেখুন।
        </p>
      </div>
    </main>
  );
}