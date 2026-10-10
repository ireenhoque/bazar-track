
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/sign-in");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[65vh] w-full items-center justify-center bg-[#f0f5f0] px-4 py-10 sm:py-12">
      <div className="w-full max-w-md">
        <header className="mb-5 text-center">
          <h1 className="text-xl font-bold text-[#253129] sm:text-2xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            বাজার দর-এর সঙ্গে যুক্ত হোন এবং বাজারের দাম দেখুন।
          </p>
        </header>

        <section className="rounded-xl border border-[#e1e9e1] bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="signup-name"
                className="mb-1 block text-xs font-medium text-[#253129]"
              >
                নাম
              </label>

              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার পুরো নাম"
                className="w-full rounded-md border border-[#e1e9e1] px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="mb-1 block text-xs font-medium text-[#253129]"
              >
                ইমেইল
              </label>

              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-[#e1e9e1] px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="mb-1 block text-xs font-medium text-[#253129]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full rounded-md border border-[#e1e9e1] px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="mb-1 block text-xs font-medium text-[#253129]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="w-full rounded-md border border-[#e1e9e1] px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="mt-4">
            <SocialLoginButtons />
          </div>
        </section>

        <p className="mt-4 text-center text-xs text-gray-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}