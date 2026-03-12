import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../constants/projects.js'

const MotionDiv = motion.div
const FILTERS = ['All', 'In Progress', 'Completed', 'On Hold', 'Planning']

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
}

function ProjectList() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus =
        activeFilter === 'All' || project.status === activeFilter
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      return matchesStatus && matchesSearch
    })
  }, [activeFilter, searchQuery])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Project Dashboard
              </p>
              <h1 className="display-font mt-2 text-5xl uppercase leading-none text-dark dark:text-gray-100 sm:text-6xl">
                Your Projects
              </h1>
            </div>
            <p className="max-w-xl text-sm text-dark/65 dark:text-gray-300">
              Filter by delivery status or search by project name to jump into
              the right DPR flow.
            </p>
          </div>

          <div className="panel flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`touch-target rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-primary text-dark'
                        : 'bg-dark/5 text-dark hover:bg-primary/20 dark:bg-[#333333] dark:text-gray-100 dark:hover:bg-[#3b3b3b]'
                    }`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>

            <label className="relative block">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark/45 dark:text-accent/45"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects by name"
                className="field-surface pl-12 pr-4"
              />
            </label>
          </div>
        </div>

        <motion.section
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <MotionDiv
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </MotionDiv>
            ))}
          </AnimatePresence>
        </motion.section>

        {filteredProjects.length === 0 ? (
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel mt-6 p-8 text-center"
          >
            <p className="text-lg font-semibold text-dark dark:text-gray-100">
              No projects match the current filters.
            </p>
            <p className="mt-2 text-sm text-dark/60 dark:text-gray-300">
              Try a different status or search term.
            </p>
          </motion.div>
        ) : null}
      </main>
    </div>
  )
}

export default ProjectList
