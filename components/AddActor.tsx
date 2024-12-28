import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { FC } from "react"
import { AntDesign } from "@expo/vector-icons"

import { COLORS } from "@/constants/constants"
import Input from "@/core/Input"

type AddActorProps = {
  actors: string[]
  actor: string
  setActor: (item: string) => void
  actorIsFocused: boolean
  setActorIsFocused: (item: boolean) => void
  handleAddActor: () => void
}

const AddActor: FC<AddActorProps> = ({
  actors,
  actor,
  setActor,
  actorIsFocused,
  setActorIsFocused,
  handleAddActor,
}) => {
  return (
    <>
      <Text style={styles.textFieldTitle}>Actors</Text>

      <View style={styles.container}>
        {actors?.map((item, index) => {
          return (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          )
        })}

        <View style={styles.inputRow}>
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
    </>
  )
}

export default AddActor

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.grey,
    minHeight: 80,
    borderRadius: 5,
    padding: 5,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 20,
    marginTop: "auto",
  },

  text: {
    marginBottom: 5,
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },

  textFieldTitle: { alignSelf: "flex-start", fontWeight: "700" },
})
