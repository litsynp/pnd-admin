'use client'
import { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import Image from 'next/image'

import { useAuth } from '@/auth/use-auth'
import { ImageMedia, mediaClient } from '@/infrastructure/media'

export default function RegisterPage() {
  const { user, accessToken } = useAuth()

  const [file, setFile] = useState<File>()
  const [uploadedImage, setUploadedImage] = useState<ImageMedia>()
  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!accessToken) {
      return
    }

    if (!file) {
      return
    }

    if (!window.confirm('이미지를 업로드하시겠습니까?')) {
      return
    }

    const response = await mediaClient.uploadImage({ file }, { accessToken })
    setUploadedImage(response)
  }

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files?.[0])
  }

  if (!user) {
    return null
  }

  return (
    <main className="flex flex-col items-center justify-center space-y-4 py-40 overflow-auto">
      <h1 className="text-xl font-bold">이미지 업로드</h1>
      <div className="flex flex-row items-center space-x-4">
        <label
          htmlFor="file"
          className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600"
        >
          파일 선택
        </label>

        <input
          id="file"
          className="hidden"
          type="file"
          onChange={onSelectFile}
        />

        {file?.name && <span>{file?.name}</span>}
      </div>

      <button
        onClick={onSubmit}
        disabled={!file}
        className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
      >
        업로드
      </button>

      {uploadedImage && <ImageViewer image={uploadedImage} />}
    </main>
  )
}

function ImageViewer({ image }: { image: ImageMedia }) {
  return (
    <div
      className="flex flex-col items-center space-y-4 p-4 border-2 border-gray-600 rounded-sm"
      style={{ marginTop: '2rem' }}
    >
      <h2 className="text-2xl font-bold">업로드된 미디어</h2>

      <Image
        className="rounded-md shadow-md"
        src={image.url}
        alt={`${image.mediaType}-${image.id}`}
        width={400}
        height={400}
      />

      <div className="border-gray-600 border-2 rounded-sm">
        <table className="border-collapse border-hidden">
          <tbody className="">
            <ImageViewerTableRow label="ID" value={image.id} />
            <ImageViewerTableRow
              label="주소"
              value={image.url}
              valueType="url"
            />
            <ImageViewerTableRow label="미디어 타입" value={image.mediaType} />
            <ImageViewerTableRow
              label="업로드 시간"
              value={image.createdAt.toISOString()}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ImageViewerTableRow({
  label,
  value,
  valueType,
}: Readonly<{
  label: string
  value: string | number
  valueType?: 'url'
}>) {
  return (
    <tr className="border-gray-600 border-2">
      <td className="border-gray-600 border-2 px-4 py-2 w-32">{label}</td>
      <td className="border-gray-600 border-2 px-4 py-2 w-96">
        {valueType === 'url' ? (
          <a
            href={value as string}
            className="line-clamp-5 cursor-pointer text-blue-500 hover:underline"
            onClick={() => {
              window.open(value as string)
            }}
          >
            {value}
          </a>
        ) : (
          <>{value}</>
        )}
      </td>
    </tr>
  )
}
