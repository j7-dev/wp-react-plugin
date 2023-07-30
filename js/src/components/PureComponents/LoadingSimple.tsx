import { LoadingOutlined } from '@ant-design/icons'

export const LoadingSimple = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center min-h-[20rem]">
      <LoadingOutlined className="text-[3rem]" />
      <p className="tracking-wider mt-4">LOADING...</p>
    </div>
  )
}
