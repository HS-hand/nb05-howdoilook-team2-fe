const logError = async (response: Response) => {
  if (!response.ok) {
    const data = await response.clone().json();
    console.error(`[프론트] ${response.url} ${response.status}`, data)

    // if (response.status === 409) {
    //   const error = new Error(data.message || '비밀번호 중복');
    //   (error as any).status = 409
    //   throw error
    // }
  }
}

const enhancedFetch: (
  url: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1] & { next?: { tags: string[] } },
) => ReturnType<typeof fetch> = async (url, init) => {
  let response: Response
  try {
    response = await fetch(url, init)
    if (!response.ok) {
      await logError(response)
    }
  } catch (error) {
    console.error(error)
    throw error
  }

  return response
}

export default enhancedFetch
