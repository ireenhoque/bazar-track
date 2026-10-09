import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const user = session.user;

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-5">
          <h1 className="text-xl font-bold text-[#253129] sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        {/* Profile summary */}
        <section className="flex flex-col gap-4 rounded-xl border border-[#e1e9e1] bg-white/80 p-4 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eeeeee] text-xl font-bold text-[#35543c]">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="h-full w-full object-cover"
              />
            ) : (
              user.name?.trim()?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="break-words text-sm font-semibold text-[#253129] sm:text-base">
              {user.name || "নাম যোগ করা হয়নি"}
            </h2>

            <p className="mt-1 break-words text-xs text-gray-500 sm:text-sm">
              {user.email}
            </p>
          </div>

          <Link
            href="/my-profile/update"
            className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-red-300 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
          >
            <span aria-hidden="true">↗</span>
            প্রোফাইল আপডেট
          </Link>
        </section>

        {/* Profile information */}
        <section className="mt-4 rounded-xl border border-[#e1e9e1] bg-white/80 p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#253129]">
            ব্যক্তিগত তথ্য
          </h2>

          <div className="mt-5">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-xs font-medium text-[#253129]"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={user.name || ""}
              readOnly
              className="w-full rounded-lg border border-[#e1e9e1] bg-gray-50 px-3 py-2.5 text-sm text-[#253129] outline-none"
            />

            <Link
              href="/my-profile/update"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-green-700 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              আপডেট
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}