import { ActivityIndicator, StyleSheet, View } from "react-native"
import React from "react"

import { COLORS } from "@/constants/constants"

const Loader = () => {
  return (
    <View style={styles.containerLoading}>
      <ActivityIndicator size="large" color={COLORS.blue} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
})
