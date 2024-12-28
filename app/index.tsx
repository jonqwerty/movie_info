import { useEffect, useState } from "react"
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"

import { COLORS } from "@/constants/constants"
import Divider from "@/core/Divider"
import { CreateUser, movieApi } from "@/api/api"
import { EMAIL_REGEX } from "@/constants/constants"
import { storage } from "@/storage/starage"

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [nameIsFocused, setNameIsFocused] = useState<boolean>(false)
  const [emailIsFocused, setEmailIsFocused] = useState<boolean>(false)
  const [passwordIsFocused, setPasswordIsFocused] = useState<boolean>(false)
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] = useState<boolean>(false)

  useEffect(() => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setNameIsFocused(false)
    setEmailIsFocused(false)
    setPasswordIsFocused(false)
    setConfirmPasswordIsFocused(false)
  }, [pathname])

  const createUserMutation = useMutation({
    mutationFn: (userData: CreateUser) => movieApi.createUser(userData),
    onSuccess: (data) => {
      if (data.status === 0) {
        Alert.alert(
          "Error",
          `Failed to create user. Code: ${data?.error?.code}. Error fields: ${JSON.stringify(
            data?.error?.fields
          )}`
        )
        return
      }

      if (data.token) {
        storage.set("token", data.token)
        router.replace("/(authenticated)/movie/list")

        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setNameIsFocused(false)
        setEmailIsFocused(false)
        setPasswordIsFocused(false)
        setConfirmPasswordIsFocused(false)
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "An error occurred")
    },
  })

  const handleSignIn = () => {
    router.push("/signin")
  }

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.")
      return
    }

    if (!email.match(EMAIL_REGEX)) {
      Alert.alert("Error", "Email is not valid.")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.")
      return
    }

    createUserMutation.mutate({ name, email, password, confirmPassword })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        style={{ width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Divider height={40} isTransparent />
        <AntDesign name="dingding" size={70} />
        <Divider height={20} isTransparent />
        <Text style={styles.logo}>MovieInfo</Text>
        <Divider height={40} isTransparent />

        <View style={styles.inputContainer}>
          <AntDesign name="user" size={24} />
          <TextInput
            cursorColor={COLORS.grey}
            style={name ? styles.input : styles.inputPlacheholder}
            value={name}
            maxLength={40}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={COLORS.grey}
            placeholder={nameIsFocused ? "" : "Name"}
            onFocus={() => setNameIsFocused(true)}
            onBlur={() => {
              const trimmedText = name.trim()
              setName(trimmedText)
              if (!trimmedText) setNameIsFocused(false)
              if (trimmedText) setNameIsFocused(true)
            }}
          />
        </View>

        <Divider height={10} isTransparent />

        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={24} />
          <TextInput
            cursorColor={COLORS.grey}
            style={email ? styles.input : styles.inputPlacheholder}
            value={email}
            maxLength={40}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholderTextColor={COLORS.grey}
            placeholder={emailIsFocused ? "" : "Email"}
            onFocus={() => setEmailIsFocused(true)}
            onBlur={() => {
              const trimmedText = email.trim()
              setEmail(trimmedText)

              if (!trimmedText) setEmailIsFocused(false)
              if (trimmedText) setEmailIsFocused(true)
            }}
          />
        </View>

        <Divider height={10} isTransparent />

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} />
          <TextInput
            cursorColor={COLORS.grey}
            style={password ? styles.input : styles.inputPlacheholder}
            value={password}
            maxLength={40}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={COLORS.grey}
            placeholder={passwordIsFocused ? "" : "Password"}
            onFocus={() => setPasswordIsFocused(true)}
            onBlur={() => {
              const trimmedText = password.trim()
              setPassword(trimmedText)
              if (!trimmedText) setPasswordIsFocused(false)
              if (trimmedText) setPasswordIsFocused(true)
            }}
          />
        </View>

        <Divider height={10} isTransparent />

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} />
          <TextInput
            cursorColor={COLORS.grey}
            style={confirmPassword ? styles.input : styles.inputPlacheholder}
            value={confirmPassword}
            maxLength={40}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholderTextColor={COLORS.grey}
            placeholder={confirmPasswordIsFocused ? "" : "Confirm password"}
            onFocus={() => setConfirmPasswordIsFocused(true)}
            onBlur={() => {
              const trimmedText = confirmPassword.trim()
              setConfirmPassword(trimmedText)
              if (!trimmedText) setConfirmPasswordIsFocused(false)
              if (trimmedText) setConfirmPasswordIsFocused(true)
            }}
          />
        </View>

        <Divider height={40} isTransparent />
        {createUserMutation.isPending ? (
          <ActivityIndicator size="large" color={COLORS.blue} />
        ) : (
          <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
        )}

        <Divider height={10} isTransparent />

        <Text style={styles.haveAccountText}>
          Already have an account?{" "}
          <Text style={styles.signInText} onPress={handleSignIn}>
            {" "}
            Sign in
          </Text>
        </Text>

        <Divider height={20} isTransparent />
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

  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
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

  haveAccountText: {
    color: COLORS.grey,
    fontSize: 14,
    marginTop: "auto",
  },

  signInText: {
    color: COLORS.black,
    fontWeight: "900",
    fontSize: 18,
  },
})
