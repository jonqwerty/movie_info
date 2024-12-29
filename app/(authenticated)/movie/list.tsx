import { StyleSheet, Text, View, FlatList } from "react-native"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"

import { movieApi } from "@/api/api"
import { COLORS } from "@/constants/constants"
import Fab from "@/core/Fab"
import Loader from "@/core/Loader"

const Page = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["movieList"],
    queryFn: movieApi.getMovies,
  })

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
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data.data}
        renderItem={({ item }) => (
          <Link href={`/movie/${item.id}`} style={styles.itemMovieContainer} asChild>
            <Text style={styles.itemMovieTitle}>{item.title}</Text>
          </Link>
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
    backgroundColor: COLORS.pale,
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
