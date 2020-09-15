export const api = async (resource: string) => {
  const data = await fetch(resource)
  return data.json()
}
