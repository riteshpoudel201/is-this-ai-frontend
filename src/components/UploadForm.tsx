/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import DetectionModal from './DetectionModal'
import { XIcon } from 'lucide-react'

const UploadForm = () => {
    const [isChecking, setIsChecking] = useState(false)
    const [currentModel, setCurrentModel] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)
    const [preview, setPreview] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        maxSize: 1024 * 1024 * 4,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles[0]) {
                setFile(acceptedFiles[0])
                setPreview(URL.createObjectURL(acceptedFiles[0]))
                setResult(null)
                setError(null)
            }
        },
    })

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    const uploadPhoto = async () => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch("https://riteshpoudel34-is-this-ai.hf.space/detect/stream", {
                method: "POST",
                body: formData,
            })

            const reader = response.body!.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const lines = decoder.decode(value).split("\n")
                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue
                    const event = JSON.parse(line.slice(6))

                    if (event.type === "progress") {
                        // Each model = 33% progress
                        setProgress(Math.round(((event.step - 1) / event.total) * 100))
                    }
                    if (event.type === "model_done") {
                        // Snap to completion of that model
                        setProgress(Math.round((event.step / event.total) * 100))
                    }
                    if (event.type === "done") {
                        setProgress(100)
                        setResult(event.result)
                    }
                }
            }
        } catch (err: any) {
            setError(err?.message ?? "Something went wrong.")
        } finally {
            setIsChecking(false)
        }
    }

    const handleCheck = () => {
        if (!file) return
        setIsChecking(true)
        setProgress(0)
        setCurrentModel(null)
        setResult(null)
        setError(null)
        setModalOpen(true)
        uploadPhoto()
    }

    return (
        <div className='max-w-[90%] md:max-w-1/2 min-h-[60dvh] mx-auto'>
            <div {...getRootProps()} className={cn(
                "border-2 border-dashed border-violet-800 rounded-xl p-10 cursor-pointer transition-colors relative",
                isDragActive ? "border-violet-600 bg-primary/10" : "border-violet-400/25",
                preview ? 'p-2' : 'p-10'
            )}>
                <input {...getInputProps()} />

                {preview ? (
                    <div className="mx-auto overflow-hidden">
                        <img src={preview} alt="Preview" className="w-auto object-fill max-h-48 mx-auto rounded-lg" />
                        <Button className="absolute p-0 size-8 top-2 right-2 rounded-full bg-transparent! text-red-500 border-none hover:text-red-700 hover:bg-transparent transition-colors" onClick={(e: any) => {
                            e.stopPropagation()
                            setPreview(null)
                            setFile(null)
                        }}>
                            <XIcon className='size-4' />
                        </Button>
                    </div>
                ) : <p className="text-muted-foreground text-sm text-center">
                    Drop files here or <span className="text-primary underline">click to upload</span>
                </p>}
            </div>

            <Button
                className="bg-violet-600 hover:bg-violet-700 w-full uppercase rounded-xl mx-auto mt-4"
                onClick={handleCheck}
                disabled={!file || isChecking}
            >
                {isChecking ? "Checking..." : "CHECK"}
            </Button>

            {error && (
                <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
            )}

            <DetectionModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                preview={preview}
                result={result}
                isChecking={isChecking}
                progress={progress}
                currentModel={currentModel}
            />
        </div>
    )
}

export default UploadForm