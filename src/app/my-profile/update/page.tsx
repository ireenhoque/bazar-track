"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Initialize the input after the session becomes available.
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session?.user]);

  // Redirect users who are not signed in.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setError(
          result.error.message ||
            "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      router.push("/my-profile");
      router.refresh();
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#f0f5f0] px-4">
        <p className="text-sm text-gray-600">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#f0f5f0] px-4">
        <p className="text-sm text-gray-600">
          সাইন ইন পেজে পাঠানো হচ্ছে...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-5">
          <h1 className="text-xl font-bold text-[#253129] sm:text-2xl">
            প্রোফাইল আপডেট
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন
          </p>
        </header>

        {/* Current user */}
        <section className="flex items-center gap-3 rounded-xl border border-[#e1e9e1] bg-white/80 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eeeeee] text-xl font-bold text-[#35543c]">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Profile"}
                className="h-full w-full object-cover"
              />
            ) : (
              session.user.name?.trim()?.charAt(0)?.toUpperCase() ||
              "U"
            )}
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-sm font-semibold text-[#253129] sm:text-base">
              {session.user.name || "নাম যোগ করা হয়নি"}
            </h2>

            <p className="mt-1 break-words text-xs text-gray-500 sm:text-sm">
              {session.user.email}
            </p>
          </div>
        </section>

        {/* Update form */}
        <section className="mt-4 rounded-xl border border-[#e1e9e1] bg-white/80 p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#253129]">
            ব্যক্তিগত তথ্য
          </h2>

          <form onSubmit={handleSubmit} className="mt-5">
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium text-[#253129]"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="আপনার নাম লিখুন"
              autoComplete="name"
              maxLength={100}
              required
              disabled={saving}
              className="w-full rounded-lg border border-[#e1e9e1] bg-transparent px-3 py-2.5 text-sm text-[#253129] outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {error && (
              <p
                role="alert"
                className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/my-profile"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                বাতিল
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-md bg-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}