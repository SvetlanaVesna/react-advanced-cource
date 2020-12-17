function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const api = (resource: string) =>
  fetch(resource)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => {
      throw Error(error.statusText)
    })

