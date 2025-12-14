export const ProfileSkeleton = () => {
  return (
    <>
      {/* HEADER SKELETON */}
      <div className="h-14 w-full flex items-center px-4 border-b border-neutral-800 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-neutral-800 mr-4" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-neutral-800 rounded" />
          <div className="w-20 h-3 bg-neutral-800 rounded" />
        </div>
      </div>

      {/* COVER + AVATAR SKELETON */}
      <section className="relative w-full h-40 bg-neutral-800 animate-pulse">
        <div className="absolute -bottom-12 left-6 right-6 flex items-end">
          <div className="w-28 h-28 rounded-full border-4 border-black bg-neutral-900" />
          <div className="ml-auto w-32 h-9 rounded-full bg-neutral-800" />
        </div>
      </section>

      {/* PROFILE INFO SKELETON */}
      <div className="pt-16 px-6 animate-pulse">
        <div className="w-40 h-5 bg-neutral-800 rounded mb-2" />
        <div className="w-24 h-4 bg-neutral-800 rounded mb-4" />

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-800 rounded" />
            <div className="w-10 h-3 bg-neutral-800 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-800 rounded" />
            <div className="w-10 h-3 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>

      {/* POSTS TAB SKELETON */}
      <section className="pt-10 px-6 animate-pulse">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-5 bg-neutral-800 rounded" />
        </div>

        {/* POSTS LIST SKELETON (3 ITEMS) */}
        <div className="flex flex-col-reverse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-neutral-800 py-6">
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-neutral-800 rounded-full" />

                {/* Content */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-32 h-4 bg-neutral-800 rounded" />
                  <div className="w-full h-3 bg-neutral-800 rounded" />
                  <div className="w-3/4 h-3 bg-neutral-800 rounded" />
                  <div className="w-1/2 h-3 bg-neutral-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
