interface SectionLabelProps {
  children: string
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 font-label ${className}`}>
      <span className="h-px w-6 bg-current" aria-hidden="true" />
      {children}
    </div>
  )
}
