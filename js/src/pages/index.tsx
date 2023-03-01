import { Row, Col } from 'antd'
import ProjectsCompanyCard from '@/components/ProjectsCompanyCard'
import ProjectsCompanyCreateButton from '@/components/ProjectsCompanyCreateButton'
import { useMany } from '@/hooks'

function DefaultPage() {
  const projects = useMany({
    resource: 'carbon-project',
    queryOptions: {
      enabled: true,
    },
  })

  const featureImgIds = !!projects
    ? projects.map((project: any) => project?.featured_media)
    : []
  const uniqueFeatureImgIds = Array.from(new Set(featureImgIds))

  const images = useMany({
    resource: 'media',
    args: {
      include: uniqueFeatureImgIds,
    },
    queryOptions: {
      enabled: (!!projects && projects.length > 0) || false,
    },
  })

  //TODO 過度態

  return (
    <>
      {!!projects ? (
        <>
          <Row
            gutter={[
              24,
              24,
            ]}
          >
            {projects.map((project: any) => {
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
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default DefaultPage
