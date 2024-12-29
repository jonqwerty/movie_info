import { useEffect } from "react"
import { Stack, usePathname, useRouter } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as SplashScreen from "expo-splash-screen"

import { COLORS } from "@/constants/constants"
import { storage } from "@/storage/starage"
import { useFonts } from "expo-font"

const queryClient = new QueryClient()

const RootLayout = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = storage.getString("token")

    if (token) {
      router.replace("/(authenticated)/movie/list")
    } else if (pathname !== "/") {
      router.replace("/")
    }
  }, [router])

  // const [loaded] = useFonts({
  //   Aclonica: require("../assets/fonts/Aclonica-Regular.ttf"),
  // })

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.white } }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="signin" />
      </Stack>
    </QueryClientProvider>
  )
}

export default RootLayout
