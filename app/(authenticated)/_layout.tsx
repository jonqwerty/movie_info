import React from "react"
import { View, Text, useWindowDimensions } from "react-native"
import { Stack, useRouter } from "expo-router"

import { storage } from "@/storage/starage"
import { COLORS } from "@/constants/constants"

const Layout = () => {
  const router = useRouter()
  const { height } = useWindowDimensions()

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: COLORS.white } }}>
      <Stack.Screen
        name="movie/list"
        options={{
          title: "Movies",
          headerRight: () => (
            <View>
              <Text
                style={{ fontWeight: "500", color: COLORS.orange }}
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
      <Stack.Screen
        name="movie/new"
        options={{
          title: "Add movie",
        }}
      />
      <Stack.Screen name="movie/[id]" options={{}} />
    </Stack>
  )
}

export default Layout
