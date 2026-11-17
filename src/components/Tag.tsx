interface TagProps {
  label?: string
  value: string
  className?: string
}

export function Tag({ label, value, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-current px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] ${className}`}
    >
      {label && <span className="opacity-60">{label}</span>}
      <span>{value}</span>
    </span>
  )
}
