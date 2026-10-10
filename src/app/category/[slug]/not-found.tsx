
import Link from "next/link";

export default function CategoryNotFound() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4 py-12">
            <section className="w-full max-w-md rounded-2xl border border-[#e4ebe4] bg-white p-8 text-center shadow-sm">
                <div className="text-5xl" aria-hidden="true">
                    🔎
                </div>

                <p className="mt-4 text-sm font-semibold text-green-700">
                    404 — ক্যাটাগরি পাওয়া যায়নি
                </p>

                <h1 className="mt-2 text-xl font-bold text-gray-900">
                    দুঃখিত! এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    ক্যাটাগরির লিংকটি ভুল হতে পারে অথবা ক্যাটাগরিটি আর উপলভ্য নেই।
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </section>
        </main>
    );
}
