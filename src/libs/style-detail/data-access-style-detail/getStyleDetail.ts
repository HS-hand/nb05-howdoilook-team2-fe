import { getStyle as getStyleDetailApi } from '@services/api'

const getStyleDetail = async (styleId: string) => {
  const response = await getStyleDetailApi(styleId)
  return response
}

export default getStyleDetail
