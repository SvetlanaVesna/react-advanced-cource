export const api = (resource: string) => async () => {
  const data = await fetch(resource)
  return data.json()
}
