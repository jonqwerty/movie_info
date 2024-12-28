import React from "react"
import { View, Text } from "react-native"
import { Stack, useRouter } from "expo-router"

import { storage } from "@/storage/starage"

const Layout = () => {
  const router = useRouter()

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}>
      <Stack.Screen
        name="movie/list"
        options={{
          title: "Movies",
          headerRight: () => (
            <View>
              <Text
                onPress={() => {
                  storage.delete("token")
                  router.replace("/")
                }}
              >
                Log out
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="movie/new" options={{}} />
      <Stack.Screen name="movie/[id]" options={{}} />
    </Stack>
  )
}

export default Layout
