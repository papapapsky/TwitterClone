export const ProfilesLoadingSkeleton = () => {
  return (
    <>
      <section className="pt-10 px-6 animate-pulse">
        <div className="flex flex-wrap justify-around">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-neutral-800 text-center">
              <div className="w-25 h-25 bg-neutral-800 rounded-full" />
              <div className="px-5 rounded-full bg-neutral-800 w-4/5 mx-auto py-2 mt-2 border-none" />
              <div className="px-5 rounded-full bg-neutral-800 w-5/5 mx-auto py-2 mt-2 border-none" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
