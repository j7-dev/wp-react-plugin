import { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import ProjectsCompanyCard from '@/components/ProjectsCompanyCard'
import ProjectsCompanyCreateButton from '@/components/ProjectsCompanyCreateButton'
import { getResources } from '@/api'
import { useMany } from '@/hooks'

function DefaultPage() {
  const [
    projects,
    setProjects,
  ] = useState<any[]>([])

  useEffect(() => {
    getResources({
      resource: 'carbon-project',
    })
      .then((res) => {
        console.log(res)
        setProjects(res.data || [])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const images = useMany({
    resource: 'media',
    args: {
      include: [23],
    },
    queryOptions: {
      enabled: projects.length > 0 || false,
    },
  })

  return (
    <Row
      gutter={[
        24,
        24,
      ]}
    >
      {projects.map((project) => {
        const image = images?.find(
          (theImage: any) => theImage?.id === project?.featured_media,
        )

        return (
          <Col
            key={project?.id}
            xl={{ span: 6 }}
            lg={{ span: 8 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <ProjectsCompanyCard
              id={project?.id}
              title={project?.title?.rendered as string}
              image={image}
              description={project?.content?.rendered as string}
            />
          </Col>
        )
      })}
      <Col
        xl={{ span: 6 }}
        lg={{ span: 8 }}
        sm={{ span: 12 }}
        xs={{ span: 24 }}
      >
        <ProjectsCompanyCreateButton />
      </Col>
    </Row>
  )
}

export default DefaultPage
