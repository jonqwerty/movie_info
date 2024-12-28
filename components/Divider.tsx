import React, { FC } from "react"
import { View } from "react-native"

interface DividerProps {
  isTransparent: boolean
  dividerColor?: string
  height: number
}

const Divider: FC<DividerProps> = ({ isTransparent = true, dividerColor, height = 0 }) => {
  return <View style={{ backgroundColor: isTransparent ? "transparent" : dividerColor, height }} />
}

export default Divider
