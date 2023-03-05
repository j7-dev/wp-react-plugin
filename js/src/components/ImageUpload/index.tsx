import { useState, useContext } from 'react'
import {
  FileImageOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Upload, UploadProps, Tag, Button } from 'antd'
import { createResource } from '@/api'
import { ProjectContext } from '@/pages/Check'

const { Dragger } = Upload

const ImageUpload = () => {
  const { scopes, setScopes } = useContext(ProjectContext)
  const imgData = scopes?.info?.imgData || {
    attachmentId: 0,
    url: '',
  }

  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  const props: UploadProps = {
    accept: '.jpg, .png, jpeg, gif',
    name: 'file',
    multiple: false,
    customRequest: async (request) => {
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

        setScopes({
          ...scopes,
          info: {
            ...scopes?.info,
            imgData: {
              attachmentId: createResult?.data?.id || 0,
              url: createResult?.data?.source_url || '',
            },
          },
        })
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log('error', error)
      }

      const newRequest = {
        ...request,
      }

      return newRequest
    },
    onChange(info) {
      setIsLoading(true)
    },
    maxCount: 1,
    showUploadList: false,
    className: 'w-full aspect-video block',
  }

  const handleDeleteImage = () => {
    setScopes({
      ...scopes,
      info: {
        ...scopes?.info,
        imgData: {
          attachmentId: 0,
          url: '',
        },
      },
    })
  }

  return (
    <>
      {!imgData.attachmentId && (
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            {isLoading ? <LoadingOutlined /> : <FileImageOutlined />}
          </p>
          <p className="ant-upload-text">
            {isLoading ? '上傳中...' : '上傳圖片'}
          </p>
          <div className="flex justify-center px-4">
            <div className="text-xs text-left  w-80">
              <p className="mb-0">建議尺寸: 400 X 225 px</p>
              <p className="mb-0">
                支援檔名: <Tag>.jpg</Tag>, <Tag>jpeg</Tag>, <Tag>gif</Tag>,{' '}
                <Tag>.png</Tag>
              </p>
            </div>
          </div>
        </Dragger>
      )}

      {!!imgData.attachmentId && (
        <div className="relative w-full aspect-video rounded-xl border-solid border-gray-200">
          <img
            className="w-full aspect-video object-cover"
            id={imgData.attachmentId.toString()}
            src={imgData.url}
          />

          <Button
            danger
            onClick={handleDeleteImage}
            className="absolute top-4 right-4"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </div>
      )}
    </>
  )
}

export default ImageUpload
