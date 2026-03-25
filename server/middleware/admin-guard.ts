export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  if (!url.pathname.startsWith('/admin')) return

  // Laisse passer /admin/[token] — le token est vérifié côté page
  const segments = url.pathname.split('/').filter(Boolean)
  if (segments.length === 2 && segments[0] === 'admin') return

  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({ statusCode: 404 })
  }
})