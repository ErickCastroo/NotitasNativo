import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import tw from "twrnc";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../context/AuthContext/useAuth";
import { PublicRoute } from '../context/AuthContext/PublicRoute'

export default function Registro() {
  const auth = useAuth();
  const { t } = useTranslation();

  const formSchema = z.object({
    nombre: z.string().min(3, { message: t("name_validation") }),
    correo: z.string().email({ message: t("email_validation") }),
    password: z.string().min(8, { message: t("password_validation") }),
    confirmPassword: z.string().min(8, {
      message: t('password_validation'),
    }).refine(data => {
      console.log(data)
      return data === getValues().password
    }, {
      message: t('password_match_validation')
    })
  });

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      password: "",
      confirmPassword: "",
    },
  });



  const onSubmit = async (data) => {
    console.log(data);
    console.log(auth);
    await auth.register(data.nombre, data.correo, data.password);
  };

  return (
    <PublicRoute>
      <View style={tw`bg-zinc-300 p-1 w-full flex justify-center items-center`}>
        <View style={tw`w-10/12 h-full flex items-center justify-center`}>
          {/* Caja #1 */}
          <View
            style={tw`w-full h-5/6 md:w-1/2 relative flex flex-col justify-center items-center bg-zinc-100 dark:bg-zinc-900`}
          >
            <View style={tw`absolute left-0 top-0`}>
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
                <Controller
                  control={control}
                  name="nombre"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.nombre && styles.errorInput]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("name_placeholder")}
                    />
                  )}
                />
                {errors.nombre && (
                  <Text style={styles.errorText}>{errors.nombre.message}</Text>
                )}
                <Controller
                  control={control}
                  name="correo"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.correo && styles.errorInput]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("email_placeholder")}
                    />
                  )}
                />
                {errors.correo && (
                  <Text style={styles.errorText}>{errors.correo.message}</Text>
                )}
  
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.password && styles.errorInput]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("password_placeholder")}
                      secureTextEntry
                    />
                  )}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
  
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.confirmPassword && styles.errorInput,
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("confirm_password_placeholder")}
                      secureTextEntry
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={styles.submitButton}
                >
                  <Text>{t("continue")}</Text>
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
    </PublicRoute>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    width: "80%",
    height: 40,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
