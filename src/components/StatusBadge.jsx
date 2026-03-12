const statusClasses = {
  'In Progress':
    'bg-primary/15 text-amber-700 ring-primary/30 dark:text-primary',
  Completed:
    'bg-emerald-500/15 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300',
  'On Hold': 'bg-rose-500/15 text-rose-700 ring-rose-600/20 dark:text-rose-300',
  Planning: 'bg-sky-500/15 text-sky-700 ring-sky-600/20 dark:text-sky-300',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ring-inset ${statusClasses[status] || statusClasses['In Progress']}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
