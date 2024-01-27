import { useMany } from '@/hooks'
import { renderHTML } from '@/utils'
import defaultImage from '@/assets/images/defaultImage.jpg'
import { TPost, TImage } from '@/types'

const GetPostsPage = () => {
  const { data, isLoading } = useMany({
    resource: 'posts',
  })

  const posts = (data?.data ?? []) as TPost[]

  const featureImgIds = !!posts ? posts.map((post) => post?.featured_media) : []
  const uniqueFeatureImgIds = Array.from(new Set(featureImgIds))

  const imagesResult = useMany({
    resource: 'media',
    args: {
      include: uniqueFeatureImgIds,
    },
    queryOptions: {
      enabled: (!!posts && posts.length > 0) || false,
    },
  })

  const images = (imagesResult?.data?.data ?? []) as TImage[]

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <>
      {!!posts ? (
        <>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 px-4 my-4">
            {posts.map((post) => {
              const image = images?.find(
                (theImage) => theImage?.id === post?.featured_media,
              )
              const title = post?.title?.rendered || ''
              const id = post?.id || ''

              return (
                <div
                  key={id}
                  className="border border-solid border-gray-300 rounded-xl overflow-hidden aspect-[3/4]"
                >
                  <img
                    alt={title}
                    src={image?.source_url || defaultImage}
                    className="w-full"
                  />
                  <div className="p-4">
                    <h2 className="text-xl">{title}</h2>
                    <div>{renderHTML(post?.content?.rendered as string)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>No Posts</>
      )}
    </>
  )
}

export default GetPostsPage
