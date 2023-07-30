import { LoadingOutlined } from '@ant-design/icons'

export const LoadingWrap = () => {
  return (
    <div className="w-full h-full backdrop-blur-sm z-50 absolute top-0 left-0 flex flex-col items-center justify-center">
      <LoadingOutlined className="text-[3rem]" />
      <p className="tracking-wider mt-4">LOADING...</p>
    </div>
  )
}
