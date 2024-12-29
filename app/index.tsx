import { useEffect, useState } from "react"
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
  Button as ButtonRN,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import { useMutation } from "@tanstack/react-query"

import { COLORS } from "@/constants/constants"
import Divider from "@/core/Divider"
import { CreateUser, movieApi } from "@/api/api"
import { EMAIL_REGEX } from "@/constants/constants"
import { storage } from "@/storage/starage"
import Input from "@/core/Input"
import Button from "@/core/Button"

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

  const [ip, setIp] = useState<string>("")

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
        <Divider height={Platform.OS === "android" ? 40 : 60} isTransparent />
        <AntDesign name="dingding" size={70} />
        <Divider height={20} isTransparent />
        <Text style={styles.logo}>MovieInfo</Text>
        <Divider height={40} isTransparent />

        <Input
          icon={<AntDesign name="user" size={24} />}
          value={name}
          setValue={setName}
          placeholder="Name"
          valueIsFocused={nameIsFocused}
          setValueIsFocused={setNameIsFocused}
          keyboardType={"default"}
        />

        <Divider height={10} isTransparent />
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

        <Divider height={10} isTransparent />
        <Input
          icon={<AntDesign name="lock" size={24} />}
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm password"
          valueIsFocused={confirmPasswordIsFocused}
          setValueIsFocused={setConfirmPasswordIsFocused}
          keyboardType={"default"}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginVertical: 10,
          }}
          placeholder="192.168.x.x"
          onChangeText={(text) => setIp(text)}
          value={ip}
        />
        <ButtonRN
          title="Set ip for back connection"
          onPress={() => {
            storage.set("ip", ip)
            setIp("")
          }}
        />

        <Divider height={40} isTransparent />
        {createUserMutation.isPending ? (
          <ActivityIndicator size="large" color={COLORS.blue} />
        ) : (
          <Button title={"Sign up"} handler={handleSignUp} />
        )}

        <Divider height={10} isTransparent />

        <Text style={styles.haveAccountText}>
          Already have an account?{" "}
          <Text style={styles.signInText} onPress={handleSignIn}>
            {" "}
            Sign in
          </Text>
        </Text>

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
    textAlign: "center",
    fontFamily: "Aclonica",
    fontSize: 40,
    fontWeight: "500",
  },

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
