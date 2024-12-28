import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import React from "react"
import { useQuery } from "@tanstack/react-query"

import { movieApi } from "@/api/api"
import { COLORS } from "@/constants/constants"
import Fab from "@/components/Fab"

const Page = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["movieList"],
    queryFn: movieApi.getMovies,
  })

  if (isPending) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemMovieContainer} onPress={() => {}}>
            <Text style={styles.itemMovieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 8,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              height: 8,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              height: 8,
            }}
          />
        )}
      />

      <Fab />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  itemMovieContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
  },
  itemMovieTitle: { fontStyle: "italic", fontWeight: "700" },
})
