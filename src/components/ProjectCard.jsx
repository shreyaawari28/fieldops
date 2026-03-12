import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'

const MotionArticle = motion.article

function ProjectCard({ project }) {
  return (
    <MotionArticle
      layout
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="panel industrial-grid overflow-hidden p-6 transition-shadow hover:shadow-2xl"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-dark dark:text-gray-100">
            {project.name}
          </h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="mb-6 space-y-3 text-sm text-dark/70 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span>{project.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <span>
            Start Date:{' '}
            {new Date(project.startDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <span>Completion</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-dark/10 dark:bg-white/10">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <Link
        to={`/dpr/${project.id}`}
        className="touch-target inline-flex items-center gap-2 text-sm font-semibold text-dark transition hover:text-primary dark:text-gray-100"
      >
        Open DPR
        <ArrowRight size={16} />
      </Link>
    </MotionArticle>
  )
}

export default ProjectCard
