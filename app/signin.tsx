import { useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { Colors } from "@/constants/Colors"
import Divider from "@/components/Divider"
import { useRouter } from "expo-router"

const Page = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [emailIsFocused, setEmailIsFocused] = useState<boolean>(false)
  const [passwordIsFocused, setPasswordIsFocused] = useState<boolean>(false)

  const handleCreteAccount = () => {
    router.back()
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
          <AntDesign name="mail" size={24} />
          <TextInput
            cursorColor={Colors.grey}
            style={email ? styles.input : styles.inputPlacheholder}
            value={email}
            maxLength={40}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholderTextColor={Colors.grey}
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
            cursorColor={Colors.grey}
            style={password ? styles.input : styles.inputPlacheholder}
            value={password}
            maxLength={40}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={Colors.grey}
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

        <Divider height={40} isTransparent />

        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>

        <Divider height={10} isTransparent />

        <Text style={styles.notMemberText}>Not a member?</Text>

        <Divider height={10} isTransparent />

        <TouchableOpacity style={styles.createAccountBtn} onPress={handleCreteAccount}>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>

        <Divider height={20} isTransparent />
      </ScrollView>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    borderColor: Colors.black,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.black,
    fontSize: 20,
  },

  inputPlacheholder: {
    flex: 1,
    marginLeft: 10,
    color: Colors.grey,
    fontSize: 20,
  },

  btn: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.black,
    borderColor: Colors.black,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: { color: Colors.white, fontSize: 24, fontWeight: "500" },

  notMemberText: {
    color: Colors.grey,
    fontSize: 14,
    marginTop: "auto",
  },

  createAccountBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 50,
  },

  createAccountText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "500",
  },
})
