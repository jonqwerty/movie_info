import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"

import Input from "@/components/Input"
import { COLORS } from "@/constants/constants"
import Divider from "@/components/Divider"
import Button from "@/components/Button"
import { AntDesign } from "@expo/vector-icons"

const Page = () => {
  const [title, setTitle] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [format, setFormat] = useState<string>("")
  const [actor, setActor] = useState<string>("")

  const [actors, setActors] = useState<string[]>([])

  const [titleIsFocused, setTitleIsFocused] = useState<boolean>(false)
  const [yearIsFocused, setYearIsFocused] = useState<boolean>(false)
  const [formatIsFocused, setFormatdIsFocused] = useState<boolean>(false)
  const [actorIsFocused, setActorIsFocused] = useState<boolean>(false)

  const handleAddActor = () => {
    setActors([...actors, actor.trim()])
    setActor("")
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
        <Input
          value={title}
          setValue={setTitle}
          placeholder="Title"
          valueIsFocused={titleIsFocused}
          setValueIsFocused={setTitleIsFocused}
          keyboardType={"default"}
        />

        <Divider height={10} isTransparent />
        <Input
          value={year}
          setValue={setYear}
          placeholder="Year"
          valueIsFocused={yearIsFocused}
          setValueIsFocused={setYearIsFocused}
          keyboardType={"default"}
        />

        <Divider height={10} isTransparent />
        <Input
          value={format}
          setValue={setFormat}
          placeholder="Format"
          valueIsFocused={formatIsFocused}
          setValueIsFocused={setFormatdIsFocused}
          keyboardType={"default"}
        />
        <Divider height={40} isTransparent />

        <Text>Actors</Text>

        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: COLORS.grey,
            minHeight: 80,
            borderRadius: 5,
            padding: 5,
          }}
        >
          {actors?.map((item, index) => {
            return (
              <Text key={index} style={{ marginBottom: 5 }}>
                {item}
              </Text>
            )
          })}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginHorizontal: 20,
              marginTop: "auto",
            }}
          >
            <Input
              value={actor}
              setValue={setActor}
              placeholder="Actor"
              valueIsFocused={actorIsFocused}
              setValueIsFocused={setActorIsFocused}
              keyboardType={"default"}
            />
            <TouchableOpacity onPress={handleAddActor}>
              <AntDesign name="plussquare" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        <Divider height={40} isTransparent />
        <Button title={"Add movie"} handler={() => {}} />
      </ScrollView>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  contentContainerStyle: { flexGrow: 1, alignItems: "center" },
})
