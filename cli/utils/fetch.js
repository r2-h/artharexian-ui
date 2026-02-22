/**
 * Fetch file content from URL
 * @param {string} url - URL to fetch
 * @returns {Promise<string>}
 */
export async function fetchFile(url) {
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`File not found: ${url}`)
    }
    throw new Error(`Failed to fetch: ${url} (${res.status})`)
  }
  return res.text()
}

/**
 * Fetch and parse JSON from URL
 * @param {string} url - URL to fetch
 * @returns {Promise<object>}
 */
export async function fetchJSON(url) {
  const content = await fetchFile(url)
  return JSON.parse(content)
}
