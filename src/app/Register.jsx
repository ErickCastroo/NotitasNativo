import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Link } from "expo-router";
import tw from "twrnc";
import { useTranslation } from "react-i18next";

export default function Registro() {
  const [nombre, setNombre] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { t } = useTranslation();

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <View style={tw`bg-zinc-300 p-1 w-full flex justify-center items-center`}>
      <View style={tw`w-10/12 h-full flex items-center justify-center`}>
        {/* Caja #1 */}
        <View
          style={tw`w-full h-5/6 md:w-1/2 relative flex flex-col justify-center items-center bg-zinc-100 dark:bg-zinc-900`}
        >
          <View style={tw`absolute right-0 top-0`}>
            <Link href="/Login" asChild>
              <TouchableOpacity
                style={tw`flex justify-end self-end m-2 mr-4 hover:underline hover:underline-offset-2`}
              >
                <Text>{t("Login")}</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View
            style={tw`h-full w-10/12 sm:w-8/12 md:w-9/12 lg:w-7/12 xl:w-6/12 flex flex-col items-center justify-center`}
          >
            <Text
              style={tw`mb-2 text-4xl text-center font-bold text-black dark:text-white`}
            >
              {t("register_title")}
            </Text>
            <Text
              style={tw`mb-6 text-center text-base text-black dark:text-white`}
            >
              {t("register_subtitle")}
            </Text>
            <View style={tw`w-full flex flex-col items-center justify-center`}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  width: "80%",
                }}
                placeholder={t('name_placeholder')}
                value={nombre}
                onChangeText={setNombre}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  width: "80%",
                }}
                placeholder="example@email.com"
                value={correo}
                onChangeText={setCorreo}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  width: "80%",
                }}
                placeholder={t('password_title')}
                secureTextEntry
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  width: "80%",
                }}
                placeholder={t('confirm_password_title')}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={onSubmit}
                style={{
                  marginTop: 20,
                  width: "80%",
                  height: 40,
                  backgroundColor: "#ccc",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
              <Text> {t('continue')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Caja #2 */}
        <View
          style={tw`hidden bg-zinc-200 dark:bg-zinc-950 w-1/2 h-5/6 md:flex items-center justify-center`}
        >
          <Image style={{ width: 180, height: 180 }} />
        </View>
      </View>
    </View>
  );
}
