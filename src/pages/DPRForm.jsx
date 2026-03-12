import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import PhotoUpload from '../components/PhotoUpload.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { createDprDefaults, weatherOptions } from '../constants/mockData.js'
import { projects } from '../constants/projects.js'

const MotionSection = motion.section

function DPRFormContent({ projectId }) {
  const navigate = useNavigate()
  const redirectTimerRef = useRef(null)
  const currentProjectId = String(projectId)
  const project = projects.find((entry) => String(entry.id) === currentProjectId)
  const [form, setForm] = useState(() => createDprDefaults(currentProjectId))
  const [photos, setPhotos] = useState([])
  const [errors, setErrors] = useState({})

  const selectedProject = useMemo(
    () => projects.find((entry) => String(entry.id) === form.projectId),
    [form.projectId],
  )

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current)
      }

      photos.forEach((photo) => {
        if (photo.previewUrl) {
          URL.revokeObjectURL(photo.previewUrl)
        }
      })
    }
  }, [photos])

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handlePhotosChange = (nextPhotos) => {
    const removedPhotos = photos.filter(
      (photo) => !nextPhotos.some((nextPhoto) => nextPhoto.id === photo.id),
    )

    removedPhotos.forEach((photo) => {
      if (photo.previewUrl) {
        URL.revokeObjectURL(photo.previewUrl)
      }
    })

    setPhotos(nextPhotos)
    setErrors((current) => ({ ...current, photos: '' }))
  }

  const resetPhotos = () => {
    photos.forEach((photo) => {
      if (photo.previewUrl) {
        URL.revokeObjectURL(photo.previewUrl)
      }
    })
    setPhotos([])
  }

  const validateForm = () => {
    const nextErrors = {
      projectId: '',
      date: '',
      weather: '',
      workDescription: '',
      workerCount: '',
      photos: '',
    }

    if (!form.projectId) {
      nextErrors.projectId = 'Please select a project'
    }

    if (!form.date) {
      nextErrors.date = 'Date is required'
    }

    if (!form.weather) {
      nextErrors.weather = 'Please select weather condition'
    }

    if (form.workDescription.trim().length < 20) {
      nextErrors.workDescription = 'Description must be at least 20 characters'
    }

    const workerCount = Number(form.workerCount)

    if (!Number.isInteger(workerCount) || workerCount < 1 || workerCount > 999) {
      nextErrors.workerCount = 'Worker count must be between 1 and 999'
    }

    if (photos.length < 1) {
      nextErrors.photos = 'Please upload at least 1 photo'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      return
    }

    toast.success('\u2705 DPR submitted successfully!')

    const nextProjectId = form.projectId
    setForm(createDprDefaults(nextProjectId))
    resetPhotos()
    setErrors({})

    redirectTimerRef.current = window.setTimeout(() => {
      navigate('/projects')
    }, 1500)
  }

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="mx-auto w-full max-w-2xl"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/projects"
            className="touch-target inline-flex items-center gap-2 text-sm font-semibold text-dark/75 transition hover:text-primary dark:text-gray-300"
          >
            &larr; Projects
          </Link>
          <ThemeToggle />
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="display-font text-5xl uppercase leading-none text-dark dark:text-gray-100">
              Daily Progress Report
            </h1>
            <p className="mt-2 text-sm text-dark/60 dark:text-gray-300">
              Capture today&apos;s field activity and supporting site photos.
            </p>
          </div>
          {selectedProject ? (
            <span className="inline-flex rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-primary/30 dark:text-primary">
              {selectedProject.name}
            </span>
          ) : null}
        </div>

        <form className="panel space-y-5 p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="projectId"
              className="mb-2 block text-sm font-semibold text-dark dark:text-gray-100"
            >
              Project
            </label>
            <select
              id="projectId"
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="field-surface"
            >
              <option value="">Select a project</option>
              {projects.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                </option>
              ))}
            </select>
            {errors.projectId ? (
              <p className="mt-2 text-sm text-rose-500">{errors.projectId}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-semibold text-dark dark:text-gray-100"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="field-surface"
            />
            {errors.date ? (
              <p className="mt-2 text-sm text-rose-500">{errors.date}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="weather"
              className="mb-2 block text-sm font-semibold text-dark dark:text-gray-100"
            >
              Weather
            </label>
            <select
              id="weather"
              name="weather"
              value={form.weather}
              onChange={handleChange}
              className="field-surface"
            >
              <option value="">Select weather condition</option>
              {weatherOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.weather ? (
              <p className="mt-2 text-sm text-rose-500">{errors.weather}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="workDescription"
              className="mb-2 block text-sm font-semibold text-dark dark:text-gray-100"
            >
              Work Description
            </label>
            <textarea
              id="workDescription"
              name="workDescription"
              rows="4"
              value={form.workDescription}
              onChange={handleChange}
              placeholder="Describe today's site activities..."
              className="field-surface min-h-[112px]"
            />
            {errors.workDescription ? (
              <p className="mt-2 text-sm text-rose-500">
                {errors.workDescription}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="workerCount"
              className="mb-2 block text-sm font-semibold text-dark dark:text-gray-100"
            >
              Worker Count
            </label>
            <input
              id="workerCount"
              name="workerCount"
              type="number"
              min="1"
              max="999"
              value={form.workerCount}
              onChange={handleChange}
              className="field-surface"
            />
            {errors.workerCount ? (
              <p className="mt-2 text-sm text-rose-500">{errors.workerCount}</p>
            ) : null}
          </div>

          <div>
            <p className="mb-2 block text-sm font-semibold text-dark dark:text-gray-100">
              Photos
            </p>
            <PhotoUpload
              files={photos}
              onChange={handlePhotosChange}
              error={errors.photos}
            />
          </div>

          <button
            type="submit"
            className="touch-target w-full rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold uppercase tracking-[0.22em] text-dark transition hover:bg-dark hover:text-light-bg"
          >
            Submit DPR
          </button>
        </form>
      </MotionSection>
    </main>
  )
}

function DPRForm() {
  const { projectId } = useParams()

  return <DPRFormContent key={projectId} projectId={projectId} />
}

export default DPRForm
