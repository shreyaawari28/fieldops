import { Camera, ImagePlus, X } from 'lucide-react'
import { useRef } from 'react'
import toast from 'react-hot-toast'

function PhotoUpload({ files = [], onChange, error }) {
  const inputRef = useRef(null)

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || [])

    if (!selectedFiles.length) {
      return
    }

    const remainingSlots = 3 - files.length

    if (remainingSlots <= 0) {
      toast.error('Max 3 photos allowed')
      event.target.value = ''
      return
    }

    if (selectedFiles.length > remainingSlots) {
      toast.error('Max 3 photos allowed')
    }

    const allowedFiles = selectedFiles.slice(0, remainingSlots).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }))

    onChange?.([...files, ...allowedFiles])
    event.target.value = ''
  }

  const handleRemove = (fileId) => {
    const fileToRemove = files.find((file) => file.id === fileId)

    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl)
    }

    onChange?.(files.filter((file) => file.id !== fileId))
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="touch-target inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-dark transition hover:bg-dark hover:text-light-bg"
      >
        <Camera size={18} />
        Upload Photos
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      <p className="mt-3 text-sm text-dark/60 dark:text-gray-300">
        Select 1 to 3 images for today&apos;s progress record.
      </p>

      {files.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="overflow-hidden rounded-2xl border border-accent bg-white dark:border-[#444444] dark:bg-[#2C2C2C]"
            >
              <div className="relative">
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  className="h-32 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(file.id)}
                  className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark/85 text-light-bg transition hover:bg-rose-500"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-3 text-sm">
                <ImagePlus size={16} className="shrink-0 text-primary" />
                <span className="truncate">{file.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}
    </div>
  )
}

export default PhotoUpload
