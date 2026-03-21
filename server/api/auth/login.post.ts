export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const supabase = useSupabase()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw createError({ statusCode: 401, message: error.message })

  await setUserSession(event, { user: { email: data.user.email } })
  return { success: true }
})