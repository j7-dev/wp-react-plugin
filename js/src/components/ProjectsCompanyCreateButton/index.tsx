import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import ProjectsImportButton from '@/components/ProjectsImportButton'
import { Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BASE_URL || ''

const ProjectsCompanyCreateButton = () => {
  return (
    <div className="aspect-[3/4] w-full">
      <div className="border-2 border-gray-300 rounded-lg border-dashed w-full h-full relative">
        <Link
          to={`${baseUrl}create`}
          className="flex flex-col justify-center items-center h-full w-full"
        >
          <div className="text-center">
            <PlusOutlined className="text-gray-300" style={{ fontSize: 48 }} />
            <div className="text-gray-300" style={{ marginTop: 24 }}>
              新增公司資料
            </div>
          </div>
        </Link>
        <div className="absolute left-2/4 bottom-8 -translate-x-2/4 -translate-y-2/4">
          <ProjectsImportButton />
        </div>
      </div>
    </div>
  )
}

export default ProjectsCompanyCreateButton
