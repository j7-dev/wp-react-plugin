export const LoadingText: React.FC<{
  height?: string
  width?: string
  isLoading?: boolean
  content?: string
  className?: string
}> = ({
  height = 'h-[1rem]',
  width = 'w-[8rem]',
  isLoading = true,
  content = '',
  className = '',
}) => {
  return isLoading ? (
    <div
      className={`${height} ${width} bg-slate-500 animate-pulse rounded-sm relative inline-block top-[2px] ${className}`}
    ></div>
  ) : (
    content
  )
}
