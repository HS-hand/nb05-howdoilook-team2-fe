'use server'

import { deleteComment as deleteCommentApi } from '@services/api'
import { CommentDeleteFormInput } from '@services/types'
import { revalidateTag } from 'next/cache'

const deleteComment = async (
  commentId: string,
  body: CommentDeleteFormInput,
) => {
  const response = await deleteCommentApi(commentId, body)

  revalidateTag('curatings')

  return response
}

export default deleteComment
