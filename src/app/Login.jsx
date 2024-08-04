import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import tw from 'twrnc';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../context/AuthContext/useAuth';


export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();

  const formSchema = z.object({
    correo: z.string().email({ message: t('email_validation') }),
    password: z.string().min(8, { message: t('password_validation') }),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: '',
      password: '',
    },
  });


  const onSubmit = async (data) => {
    await auth.login(data.correo, data.password);
  };

  return (
    <View style={tw`bg-zinc-300 p-1 w-full flex justify-center items-center h-full`}>
      <View style={tw`w-10/12 h-full flex items-center justify-center`}>
        <View style={[tw`hidden bg-zinc-100 dark:bg-zinc-950 w-1/2 h-5/6 md:flex items-center justify-center`, styles.shadow]}></View>

        <View style={[tw`w-full h-5/6 md:w-1/2 relative flex flex-col justify-center items-center bg-zinc-100 dark:bg-zinc-900`, styles.shadow]}>
          <View style={tw`absolute right-0 top-0`}>
            <Link href="/Register" asChild>
              <TouchableOpacity style={tw`flex justify-end self-end m-2 mr-4 hover:underline hover:underline-offset-2`}>
                <Text>{t('register')}</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={tw`h-full w-10/12 sm:w-8/12 md:w-9/12 lg:w-7/12 xl:w-6/12 flex flex-col items-center justify-center`}>
            <Text style={tw`mb-2 text-4xl text-center font-bold`}>{t('login_title')}</Text>
            <Text style={tw`mb-6 text-center`}>{t('login_subtitle')}</Text>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Controller
                control={control}
                name="correo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.correo && styles.errorInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="example@email.com"
                  />
                )}
              />
              {errors.correo && <Text style={styles.errorText}>{errors.correo.message}</Text>}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.password && styles.errorInput]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={t('password_title')}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
              <Text>{t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    width: '80%',
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});