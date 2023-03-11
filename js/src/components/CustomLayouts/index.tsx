import { useState, useEffect } from 'react'
import { defaultRouterMetas } from '@/Router'
import { Outlet, useLocation } from 'react-router-dom'

const CustomLayouts = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [
    title,
    setTitle,
  ] = useState<string>('')

  useEffect(() => {
    const newTitle =
      defaultRouterMetas.find((item) => item.path === pathname)?.title ||
      'undefined path'
    setTitle(newTitle)
  }, [pathname])

  return (
    <div className="w-full flex flex-col my-16">
      <h1 className="text-2xl my-8 py-4 border-2 border-dashed border-yellow-500 text-center">
        {title} - This is a Layout Components
      </h1>
      <Outlet />
    </div>
  )
}

export default CustomLayouts
