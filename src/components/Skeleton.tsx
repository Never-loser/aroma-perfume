export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-white/8 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-4">
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <Skeleton className="mt-4 h-2.5 w-1/3" />
      <Skeleton className="mt-2 h-4 w-2/3" />
      <Skeleton className="mt-2 h-3 w-full" />
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-11 w-11 rounded-2xl" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2">
      <div>
        <Skeleton className="h-96 w-full rounded-[2rem]" />
        <div className="mt-3 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} className="h-20 w-full rounded-2xl" />))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="mt-4 h-24 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
}
