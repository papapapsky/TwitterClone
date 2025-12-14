export const HomeSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700 animate-pulse">
      {/* POSTS LIST SKELETON — 5 ITEMS */}
      <div className="flex flex-col-reverse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="border-b border-neutral-800 py-5 px-4 flex gap-3"
          >
            {/* Avatar */}
            <div className="w-8 h-8 bg-neutral-800 rounded-full" />

            {/* Post content skeleton */}
            <div className="flex flex-col gap-2 w-full">
              <div className="w-32 h-4 bg-neutral-800 rounded" />
              <div className="w-full h-3 bg-neutral-800 rounded" />
              <div className="w-4/5 h-3 bg-neutral-800 rounded" />
              <div className="w-1/2 h-3 bg-neutral-800 rounded" />

              {/* Likes/Comments skeleton */}
              <div className="flex gap-4 pt-2">
                <div className="w-10 h-4 bg-neutral-800 rounded" />
                <div className="w-10 h-4 bg-neutral-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE BUTTON SKELETON */}
      <div className="flex justify-center py-5">
        <div className="w-32 h-9 bg-neutral-800 rounded-full" />
      </div>
    </div>
  );
};
