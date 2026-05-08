import DetectionResult from './DetectionResult'
import Loading from './Loading'
// import Loading from './Loading'
// import DetectionResultSkeleton from './skeletons/DetectionResultSkeleton'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

interface ModelResult {
    is_ai_generated: boolean
    confidence: number
    artificial: number
    human: number
}

interface DetectionModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    preview: string | null
    result: {
        filename: string
        is_ai_generated: boolean
        confidence: number
        vote_count: number
        model_results: Record<string, ModelResult>
    } | null
    isChecking: boolean
    progress: number
    currentModel: string | null
}

const DetectionModal = ({ open, onOpenChange, preview, result, isChecking, progress, currentModel }: DetectionModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl bg-slate-200/30 rounded-2xl max-h-auto  p-4">
                <DialogTitle className="sr-only">Detection Result</DialogTitle>
                <div className='overflow-y-auto max-h-[80vh] p-4 mt-16'>
                    {preview && (
                        <div className="rounded-xl overflow-hidden border border-muted">
                            <img
                                src={preview}
                                alt="Uploaded"
                                className="w-full object-cover max-h-64 rounded-xl"
                            />
                        </div>
                    )}

                    {isChecking && (
                        <div className="mt-2 space-y-1">
                            <div className="relative w-full h-10 rounded-xl overflow-hidden bg-muted">
                                <div
                                    className="h-full bg-violet-700 transition-all duration-300 ease-in-out"
                                    style={{ width: `${progress}%` }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium mix-blend-difference text-white uppercase">
                                    {progress}%
                                </span>
                            </div>
                            {currentModel && (
                                <p className="text-xs text-muted-foreground text-center truncate">
                                    Running {currentModel}...
                                </p>
                            )}
                        </div>
                    )}

                    {result
                        ? <DetectionResult {...result} />
                        : !isChecking && <Loading />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DetectionModal