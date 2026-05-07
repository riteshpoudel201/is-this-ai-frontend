const Bone = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`animate-pulse rounded-md bg-muted ${className ?? ''}`} style={style} />
)

const DetectionResultSkeleton = () => {
    return (
        <div className="mt-6 space-y-4">
            {/* Verdict skeleton */}
            <div className="rounded-xl p-5 border border-muted text-center space-y-2">
                <Bone className="h-3 w-24 mx-auto" />
                <Bone className="h-10 w-28 mx-auto" />
                <Bone className="h-3 w-36 mx-auto" />
            </div>

            {/* Chart skeleton */}
            <div className="rounded-lg border border-muted p-4 space-y-3">
                <Bone className="h-4 w-32" />
                <Bone className="h-3 w-48" />
                <div className="flex items-end justify-around gap-4 pt-2 h-40">
                    {[60, 90, 45].map((h, i) => (
                        <Bone key={i} className="flex-1 rounded-xl" style={{ height: `${h}%` }} />
                    ))}
                </div>
            </div>

            {/* Per-model rows skeleton */}
            <div className="rounded-xl border border-muted overflow-hidden p-4 space-y-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-muted rounded-2xl px-4 py-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <Bone className="h-4 w-24" />
                            <Bone className="h-5 w-12 rounded-full" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Bone className="h-3 w-10" />
                            <Bone className="flex-1 h-1.5 rounded-full" />
                            <Bone className="h-3 w-10" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Bone className="h-3 w-10" />
                            <Bone className="flex-1 h-1.5 rounded-full" />
                            <Bone className="h-3 w-10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetectionResultSkeleton