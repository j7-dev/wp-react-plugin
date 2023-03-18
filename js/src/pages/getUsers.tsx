import { useMany } from '@/hooks'
import defaultImage from '@/assets/images/defaultImage.jpg'

const GetUsersPage = () => {
  const users = useMany({
    resource: 'users',
    queryOptions: {
      enabled: true,
    },
  })

  return (
    <>
      {!!users ? (
        <>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 px-4 my-4">
            {users.map((user: any) => {
              const image = user?.avatar_urls?.['96'] || ''
              const name = user?.name || ''
              const id = user?.id || ''

              return (
                <div
                  key={id}
                  className="border border-solid border-gray-300 rounded-xl overflow-hidden aspect-[3/4]"
                >
                  <div className="text-center mt-8">
                    <img
                      alt={name}
                      src={image?.source_url || defaultImage}
                      className="aspect-square w-16 rounded-full mx-auto object-cover"
                    />
                    <h2 className="text-xl">{name}</h2>
                  </div>
                  <div className="p-4">
                    <p className="mb-0 text-xs">id: {id}</p>
                    <p className="mb-0 text-xs">slug: {user?.slug}</p>
                    <p className="mb-0 text-xs">
                      description: {user?.description}
                    </p>
                    <p className="mb-0 text-xs">author page: {user?.link}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>No Users</>
      )}
    </>
  )
}

export default GetUsersPage
