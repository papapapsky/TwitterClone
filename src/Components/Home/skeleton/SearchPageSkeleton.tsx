export const SearchPageSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700 animate-pulse">
      {/* POSTS SKELETON LIST */}
      <div className="flex flex-col">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border-b border-neutral-800 py-5 px-4 flex gap-3"
          >
            <div className="w-10 h-10 bg-neutral-800 rounded-full" />

            <div className="flex flex-col gap-2 w-full">
              <div className="w-28 h-4 bg-neutral-800 rounded" />
              <div className="w-full h-3 bg-neutral-800 rounded" />
              <div className="w-4/5 h-3 bg-neutral-800 rounded" />
              <div className="w-1/2 h-3 bg-neutral-800 rounded" />

              <div className="flex gap-4 pt-2">
                <div className="w-10 h-4 bg-neutral-800 rounded" />
                <div className="w-10 h-4 bg-neutral-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* USERS GRID SKELETON */}
      <div className="flex gap-5 px-10 justify-evenly flex-wrap w-full py-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center max-w-30 min-w-40 py-3"
          >
            <div className="w-20 h-20 rounded-full bg-neutral-800" />
            <div className="mt-3 w-24 h-4 bg-neutral-800 rounded" />
            <div className="mt-1 w-16 h-4 bg-neutral-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
