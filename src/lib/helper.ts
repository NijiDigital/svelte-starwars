export const lastPath = (url: string): string => {
    const paths = url.split('/').filter(item => item)
    return paths[paths.length - 1]
}
