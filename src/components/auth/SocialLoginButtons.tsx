
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialLoginButtons() {
  const [loading, setLoading] = useState<Provider | null>(null);
  const [error, setError] = useState("");

  async function signIn(provider: Provider) {
    setLoading(provider);
    setError("");

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        setLoading(null);
      }
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e1e9e1]" />
        <span className="text-xs text-gray-500">অথবা</span>
        <div className="h-px flex-1 bg-[#e1e9e1]" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => signIn("google")}
          disabled={loading !== null}
          className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#e1e9e1] bg-white px-3 py-2 text-xs font-medium text-[#253129] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GoogleIcon />
          {loading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে সাইন ইন"}
        </button>

        <button
          type="button"
          onClick={() => signIn("github")}
          disabled={loading !== null}
          className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#e1e9e1] bg-white px-3 py-2 text-xs font-medium text-[#253129] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GitHubIcon />
          {loading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে সাইন ইন"}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.12 7.13-10.2 7.13-17.58Z" transform="translate(0 -1)" />
      <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 1)" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.64-5.93c-2.12 1.42-4.84 2.26-8.27 2.26-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -3)" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.06c-3.1.68-3.76-1.31-3.76-1.31-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.65 2.1 3.36 1.61.1-.73.39-1.23.7-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.56 0c2.1-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.24-5.11 5.52.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}
