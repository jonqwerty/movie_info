import { useState } from "react"
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"

import { COLORS, EMAIL_REGEX } from "@/constants/constants"
import Divider from "@/core/Divider"
import { movieApi, SignInUser } from "@/api/api"
import { storage } from "@/storage/starage"
import Input from "@/core/Input"
import Button from "@/core/Button"

const Page = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [emailIsFocused, setEmailIsFocused] = useState<boolean>(false)
  const [passwordIsFocused, setPasswordIsFocused] = useState<boolean>(false)

  const signInUserMutation = useMutation({
    mutationFn: (userData: SignInUser) => movieApi.signInUser(userData),
    onSuccess: (data) => {
      if (data.status === 0) {
        Alert.alert(
          "Error",
          `Failed to sign in user. Code: ${data?.error?.code}. Error fields: ${JSON.stringify(
            data?.error?.fields
          )}`
        )
        return
      }

      if (data.token) {
        storage.set("token", data.token)
        router.back()
        router.replace("/(authenticated)/movie/list")
        setEmail("")
        setPassword("")
        setEmailIsFocused(false)
        setPasswordIsFocused(false)
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "An error occurred")
    },
  })

  const handleCreteAccount = () => {
    router.back()
  }

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.")
      return
    }

    if (!email.match(EMAIL_REGEX)) {
      Alert.alert("Error", "Email is not valid.")
      return
    }

    signInUserMutation.mutate({ email, password })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        style={{ width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Divider height={Platform.OS === "android" ? 40 : 60} isTransparent />
        <AntDesign name="dingding" size={70} />
        <Divider height={20} isTransparent />
        <Text style={styles.logo}>MovieInfo</Text>
        <Divider height={40} isTransparent />

        <Input
          icon={<AntDesign name="mail" size={24} />}
          value={email}
          setValue={setEmail}
          placeholder="Email"
          valueIsFocused={emailIsFocused}
          setValueIsFocused={setEmailIsFocused}
          keyboardType={"email-address"}
        />

        <Divider height={10} isTransparent />
        <Input
          icon={<AntDesign name="lock" size={24} />}
          value={password}
          setValue={setPassword}
          placeholder="Password"
          valueIsFocused={passwordIsFocused}
          setValueIsFocused={setPasswordIsFocused}
          keyboardType={"default"}
        />

        <Divider height={40} isTransparent />
        {signInUserMutation.isPending ? (
          <ActivityIndicator size="large" color={COLORS.blue} />
        ) : (
          <Button title={"Sign in"} handler={handleSignIn} />
        )}

        <Divider height={10} isTransparent />

        <Text style={styles.notMemberText}>Not a member?</Text>

        <Divider height={10} isTransparent />

        <TouchableOpacity style={styles.createAccountBtn} onPress={handleCreteAccount}>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>

        <Divider height={Platform.OS === "android" ? 20 : 40} isTransparent />
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

  logo: {
    fontSize: 40,
    fontWeight: "500",
  },

  notMemberText: {
    color: COLORS.grey,
    fontSize: 14,
    marginTop: "auto",
  },

  createAccountBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 50,
  },

  createAccountText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500",
  },
})
