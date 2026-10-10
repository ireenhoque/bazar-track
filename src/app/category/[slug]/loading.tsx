
export default function CategoryLoading() {
  return (
    <main
      className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-6 sm:py-8"
      aria-label="ক্যাটাগরি লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-7xl animate-pulse">
        <div className="mb-4 h-4 w-32 rounded bg-gray-200" />

        <div className="mb-5 rounded-2xl border border-[#e4ebe4] bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="h-5 w-36 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-52 max-w-full rounded bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-between rounded-xl bg-white p-4">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="h-9 w-44 max-w-[50%] rounded-lg bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-32 rounded bg-gray-100" />
                </div>
              </div>
              <div className="mt-5 h-6 w-28 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-20 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
