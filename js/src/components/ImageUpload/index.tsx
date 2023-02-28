import { FileImageOutlined } from '@ant-design/icons'
import { Upload, UploadProps, Tag } from 'antd'
import { createResource } from '@/api'

const { Dragger } = Upload

const ImageUpload = () => {
  const props: UploadProps = {
    accept: '.jpg, .png, jpeg, gif',
    name: 'file',
    multiple: false,
    customRequest: async (request) => {
      console.log('request', request)

      // const { status } = info.file
      // console.log('status', status)
      // TODO
      try {
        const createResult = await createResource({
          resource: 'media',
          args: {
            file: request.file,
          },
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        })
        console.log('createResult', createResult)
      } catch (error) {
        console.log('error', error)
      }

      const newRequest = {
        ...request,
        onProgress: (e: { percent: number }) => {
          console.log('e', e)
        },
        onError: (error: any) => {
          console.log('error', error)
        },
        onSuccess: (response: any) => {
          console.log('response', response)
        },
      }

      return newRequest
    },
    onChange(info) {
      console.log('info', info)
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    maxCount: 1,
  }

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <FileImageOutlined />
      </p>
      <p className="ant-upload-text">上傳圖片</p>
      <div className="flex justify-center px-4">
        <div className="text-xs text-left  w-80">
          <p className="mb-0">建議尺寸: 320 X 180 px</p>
          <p className="mb-0">
            支援檔名: <Tag>.jpg</Tag>, <Tag>jpeg</Tag>, <Tag>gif</Tag>,{' '}
            <Tag>.png</Tag>
          </p>
        </div>
      </div>
    </Dragger>
  )
}

export default ImageUpload
