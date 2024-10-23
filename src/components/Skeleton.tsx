export const Skeleton = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between rounded-lg bg-white">
      <div className="relative h-56 w-full animate-pulse rounded-t-lg bg-zinc-200" />

      <div className="w-full space-y-4 p-4">
        <div className="h-6 w-56 animate-pulse rounded bg-zinc-200" />

        <div className="space-y-1">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
        </div>

        <div className="h-8 w-40 animate-pulse rounded bg-zinc-200" />
      </div>
    </div>
  )
}
