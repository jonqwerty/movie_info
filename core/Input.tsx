import { KeyboardTypeOptions, StyleSheet, TextInput, View, Text } from "react-native"
import React, { FC, ReactNode } from "react"

import { COLORS } from "@/constants/constants"
import { Format } from "@/api/api"

type Input = {
  icon?: ReactNode
  value: string
  placeholder: string
  setValue: (text: Format | string) => void
  valueIsFocused: boolean
  setValueIsFocused: (value: boolean) => void
  keyboardType: KeyboardTypeOptions
}

const Input: FC<Input> = ({
  icon,
  value,
  placeholder,
  setValue,
  valueIsFocused,
  setValueIsFocused,
  keyboardType,
}) => {
  return (
    <View style={styles.inputContainer}>
      {icon ? icon : null}
      <TextInput
        cursorColor={COLORS.grey}
        style={value ? styles.input : styles.inputPlacheholder}
        value={value}
        maxLength={40}
        keyboardType={keyboardType}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor={COLORS.grey}
        placeholder={valueIsFocused ? "" : placeholder}
        onFocus={() => setValueIsFocused(true)}
        onBlur={() => {
          const trimmedText = value.trim()
          setValue(trimmedText)
          if (!trimmedText) setValueIsFocused(false)
          if (trimmedText) setValueIsFocused(true)
        }}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 20,
  },

  inputPlacheholder: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.grey,
    fontSize: 20,
  },
})
