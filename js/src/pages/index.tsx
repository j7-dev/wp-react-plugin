import { useEffect } from 'react'
import { Row, Col } from 'antd'
import ProjectsCompanyCard from '@/components/ProjectsCompanyCard'
import ProjectsCompanyCreateButton from '@/components/ProjectsCompanyCreateButton'
import { useMany } from '@/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BASE_URL || ''

function DefaultPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action')

  const projects = useMany({
    resource: 'carbon-project',
    args: {
      author: window?.userData?.userId || '0',
    },
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

  useEffect(() => {
    const navigateInfoStr = sessionStorage.getItem('navigateInfo') || '{}'
    if (navigateInfoStr !== '{}' && action === 'redirect') {
      const navigateInfo = JSON.parse(navigateInfoStr)
      navigate(`${baseUrl}${navigateInfo?.path || ''}`, {
        state: navigateInfo?.state || {},
      })
    }
  }, [])

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
