import { Alert, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { COLORS } from "@/constants/constants"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AntDesign } from "@expo/vector-icons"

import { movieApi } from "@/api/api"
import Loader from "@/core/Loader"
import Divider from "@/core/Divider"
import { dateConverter } from "@/utils/helpers"

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data, error, isPending } = useQuery({
    queryKey: ["movieList", id],
    queryFn: () => movieApi.getMovie(id),
  })

  const deleteMovieMutation = useMutation({
    mutationFn: () => movieApi.deleteMovie(id),
    onSuccess: (data) => {
      if (data.status === 0) {
        Alert.alert(
          "Error",
          `Failed to delete movie. Code: ${data?.error?.code}. Error fields: ${JSON.stringify(
            data?.error?.fields || data?.error?.message
          )}`
        )
        return
      }
      if (data.status === 1) {
        queryClient.invalidateQueries({ queryKey: ["movieList"] })
      }
    },

    onError: (error) => {
      Alert.alert("Error", error.message || "An error occurred")
    },
  })

  const handleDeleteMovie = () => {
    Alert.alert("Alert", "Are you sure you want to delete movie?", [
      {
        text: "Yes",
        onPress: () => {
          deleteMovieMutation.mutate()
          router.back()
        },
      },
      { text: "No", onPress: undefined },
    ])
  }

  if (isPending) {
    return <Loader />
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleDeleteMovie} style={{ padding: 12 }}>
              <AntDesign name="delete" size={24} color={COLORS.orange} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={{ flex: 1, backgroundColor: COLORS.pale }}>
        {deleteMovieMutation.isPending ? <Loader /> : null}

        {/* {Platform.OS === "android" ? (
        <View
          style={{ height: 60, borderBottomWidth: StyleSheet.hairlineWidth, alignItems: "center" }}
        >
          <View style={styles.grabber} />
          <Text style={styles.titleModal}>Movie info</Text>
          <Pressable
            style={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
            onPress={handleDeleteMovie}
          >
            <AntDesign name="delete" size={24} color={COLORS.orange} />
          </Pressable>
        </View>
      ) : null} */}

        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={styles.textOne}>Id:</Text>
            <Text style={styles.textTwo}>{data?.data?.id}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textOne}>Title:</Text>
            <Text style={styles.textTwo}>{data?.data?.title}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textOne}>Year:</Text>
            <Text style={styles.textTwo}>{data?.data?.year}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textOne}>Format:</Text>
            <Text style={styles.textTwo}>{data?.data?.format}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textOne}>Created at:</Text>
            <Text style={styles.textTwo}>{dateConverter(data?.data?.createdAt)}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textOne}>Updated at:</Text>
            <Text style={styles.textTwo}>{dateConverter(data?.data?.updatedAt)}</Text>
          </View>

          <Divider isTransparent height={20} />
          <Text style={styles.textOne}>Actors:</Text>
          {data?.data?.actors.map((item, index) => {
            return (
              <Text key={index} style={styles.textTwoAndroid}>
                {item.name}
              </Text>
            )
          })}
        </View>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  grabber: {
    width: 40,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginTop: 5,
  },

  titleModal: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
  },

  textOne: { width: 90 },

  textTwo: { fontSize: 18, fontWeight: "700", fontStyle: "italic", flex: 1 },

  textTwoAndroid: { fontSize: 18, fontWeight: "700", fontStyle: "italic" },

  rowContainer: { flexDirection: "row", alignItems: "flex-end", marginTop: 8 },
})
