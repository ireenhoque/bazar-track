
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
    redirect("/sign-in");
  }

  const user = session.user;

  return (
    <main className="min-h-[calc(100vh-120px)] overflow-x-hidden bg-[#f0f5f0] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-2xl">
        {/* Page heading */}
        <header className="mb-5 sm:mb-6">
          <h1 className="text-xl font-bold text-[#253129] sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </header>

        {/* Profile summary */}
        <section className="rounded-xl border border-[#e1e9e1] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            {/* Avatar and user details */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eeeeee] text-xl font-bold text-[#35543c] sm:h-16 sm:w-16">
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
                <h2 className="break-words text-sm font-semibold leading-5 text-[#253129] sm:text-base">
                  {user.name || "নাম যোগ করা হয়নি"}
                </h2>

                <p className="mt-1 break-all text-xs leading-5 text-gray-500 sm:text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Update profile action */}
            <Link
              href="/my-profile/update"
              className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:w-auto sm:shrink-0"
            >
              <span aria-hidden="true">↗</span>
              প্রোফাইল আপডেট
            </Link>
          </div>
        </section>

        {/* Personal information */}
        <section className="mt-4 rounded-xl border border-[#e1e9e1] bg-white p-4 shadow-sm sm:mt-5 sm:p-6">
          <h2 className="text-base font-semibold text-[#253129] sm:text-lg">
            ব্যক্তিগত তথ্য
          </h2>

          <div className="mt-5">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-[#253129]"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={user.name || ""}
              readOnly
              className="block min-h-11 w-full min-w-0 rounded-lg border border-[#e1e9e1] bg-gray-50 px-3 py-2.5 text-sm text-[#253129] outline-none"
            />

            <Link
              href="/my-profile/update"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              প্রোফাইল আপডেট করুন
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
