import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { FC } from "react"

import { COLORS } from "@/constants/constants"

type ButtonProps = {
  title: string
  handler: () => void
}

const Button: FC<ButtonProps> = ({ title, handler }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={handler}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: { color: COLORS.white, fontSize: 24, fontWeight: "500" },
})
