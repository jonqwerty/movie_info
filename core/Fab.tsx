import { StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { COLORS } from "@/constants/constants"

const Fab = () => {
  const router = useRouter()

  const onPress = () => {
    router.push("/movie/new")
  }

  return (
    <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={onPress}>
      <AntDesign name="plus" size={24} color={COLORS.white} />
    </TouchableOpacity>
  )
}

export default Fab

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    zIndex: 100,
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
})
