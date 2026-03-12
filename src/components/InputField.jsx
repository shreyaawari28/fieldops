function InputField({
  as = 'input',
  className = '',
  error,
  label,
  ...props
}) {
  const Component = as

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-dark dark:text-light-bg">
        {label}
      </span>
      <Component
        className={`field-surface ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-2 block text-sm text-rose-500">{error}</span>
      ) : null}
    </label>
  )
}

export default InputField
