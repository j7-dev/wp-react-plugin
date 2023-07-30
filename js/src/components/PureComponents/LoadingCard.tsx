import React from 'react'

export const LoadingCard: React.FC<{
  ratio?: string
}> = ({ ratio = 'aspect-video' }) => {
  return (
    <div
      className={`${ratio} bg-slate-500 animate-pulse rounded-lg py-[21px] pl-[28px] pr-6 relative mb-[10px]`}
    ></div>
  )
}
