import { fetchJson } from '@/helper/fetcher'
import { generateAuthHeader } from '@/infrastructure/pnd/header'
import { ImageMedia } from '@/infrastructure/media/media.view'

async function uploadImage(
  { file }: { file: File },
  { accessToken }: { accessToken: string },
): Promise<ImageMedia> {
  interface UploadImageApiResponse {
    id: number
    mediaType: 'image'
    url: string
    createdAt: string
  }

  function buildUploadImageResponse(data: UploadImageApiResponse): ImageMedia {
    return {
      id: data.id,
      mediaType: data.mediaType,
      url: data.url,
      createdAt: new Date(data.createdAt),
    }
  }

  const formData = new FormData()
  formData.append('file', file)

  const data = await fetchJson<UploadImageApiResponse>(`/api/media/images`, {
    method: 'POST',
    headers: generateAuthHeader(accessToken),
    body: formData,
  })

  return buildUploadImageResponse(data)
}

export const mediaClient = {
  uploadImage,
}
