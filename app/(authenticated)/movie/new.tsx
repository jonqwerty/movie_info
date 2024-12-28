import { Alert, ScrollView, StyleSheet, View, Text } from "react-native"
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"

import Input from "@/core/Input"
import { COLORS } from "@/constants/constants"
import Divider from "@/core/Divider"
import Button from "@/core/Button"
import AddActor from "@/components/AddActor"
import { CreateMovie, Format, movieApi } from "@/api/api"

const Page = () => {
  const router = useRouter()

  const [title, setTitle] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [format, setFormat] = useState<Format | string>("")
  const [actor, setActor] = useState<string>("")

  const [actors, setActors] = useState<string[]>([])

  const [titleIsFocused, setTitleIsFocused] = useState<boolean>(false)
  const [yearIsFocused, setYearIsFocused] = useState<boolean>(false)
  const [formatIsFocused, setFormatdIsFocused] = useState<boolean>(false)
  const [actorIsFocused, setActorIsFocused] = useState<boolean>(false)

  const addMovieMutation = useMutation({
    mutationFn: (movieData: CreateMovie) => movieApi.createMovie(movieData),
    onSuccess: (data) => {
      if (data.status === 0) {
        Alert.alert(
          "Error",
          `Failed to create movie. Code: ${data?.error?.code}. Error fields: ${JSON.stringify(
            data?.error?.fields
          )}`
        )
        return
      }
      if (data.data.id) {
        router.back()
        setTitle("")
        setYear("")
        setFormat("")
        setActor("")
        setActors([])
        setTitleIsFocused(false)
        setYearIsFocused(false)
        setFormatdIsFocused(false)
        setActorIsFocused(false)
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "An error occurred")
    },
  })

  const handleAddActor = () => {
    if (actor.trim().length === 0) return
    if (actors.length > 6) {
      setActor("")
      Alert.alert("Error", "I think that is enough.")
      return
    }
    setActors([...actors, actor.trim()])
    setActor("")
  }

  const handleAddMovie = () => {
    if (!title || !year || !format || !actors.length) {
      Alert.alert("Error", "All fields are required.")
      return
    }

    if (isNaN(+year.trim()) || year === "") {
      Alert.alert("Error", "Year should be a number.")
      return
    }

    if (Number(year) < 1900 || Number(year) > 2021) {
      alert("Year must be between 1900 and 2021.")
      return false
    }

    if (!["VHS", "DVD", "Blu-ray"].includes(format)) {
      Alert.alert("Error", 'Format should be "VHS" or "DVD" or "Blu-ray".')
      return
    }

    if (actors.length < 1 || actors.length > 7) {
      Alert.alert("Error", "There should be from 1 to 7 actors.")
      return
    }

    addMovieMutation.mutate({ title, year: Number(year), format, actors })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        style={{ width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Divider height={10} isTransparent />
        <Text style={styles.textFieldTitle}>Title</Text>
        <Input
          value={title}
          setValue={setTitle}
          placeholder="Title"
          valueIsFocused={titleIsFocused}
          setValueIsFocused={setTitleIsFocused}
          keyboardType={"default"}
        />

        <Divider height={10} isTransparent />
        <Text style={styles.textFieldTitle}>Year</Text>
        <Input
          value={year}
          setValue={setYear}
          placeholder="Year"
          valueIsFocused={yearIsFocused}
          setValueIsFocused={setYearIsFocused}
          keyboardType={"default"}
        />

        <Divider height={10} isTransparent />
        <Text style={styles.textFieldTitle}>Format</Text>
        <Input
          value={format}
          setValue={setFormat}
          placeholder="Format"
          valueIsFocused={formatIsFocused}
          setValueIsFocused={setFormatdIsFocused}
          keyboardType={"default"}
        />

        <Divider height={10} isTransparent />
        <AddActor
          actors={actors}
          actor={actor}
          setActor={setActor}
          actorIsFocused={actorIsFocused}
          setActorIsFocused={setActorIsFocused}
          handleAddActor={handleAddActor}
        />

        <Divider height={40} isTransparent />
        <Button title={"Add movie"} handler={handleAddMovie} />
      </ScrollView>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pale,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  contentContainerStyle: { flexGrow: 1, alignItems: "center" },

  textFieldTitle: { alignSelf: "flex-start", fontWeight: "700" },
})
