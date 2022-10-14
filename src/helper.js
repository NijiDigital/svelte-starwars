export const lastPath = (url) => {
  const paths = url.split('/').filter(item => item)
  return paths[paths.length - 1]
}