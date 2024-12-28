import { Stack } from "expo-router"

import { Colors } from "@/constants/Colors"

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.white } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signin" />
    </Stack>
  )
}

export default RootLayout
