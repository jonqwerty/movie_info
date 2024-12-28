import React from "react"
import { Stack, useRouter } from "expo-router"

const Layout = () => {
  const router = useRouter()
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}>
      <Stack.Screen name="movie/list" options={{}} />
      <Stack.Screen name="movie/new" options={{}} />
      <Stack.Screen name="movie/[id]" options={{}} />
    </Stack>
  )
}

export default Layout
