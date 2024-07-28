import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { crearUsuarioByTokenResponse, fetchData } from '../../lib/utils';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [usuarioVerificado, setUsuarioVerificado] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const obtenerUsuarioDesdeStorage = async () => {
      try {
        const usuarioCookie = await AsyncStorage.getItem('usuario');
        if (usuarioCookie) {
          setUsuario(JSON.parse(usuarioCookie));
        }
        setUsuarioVerificado(true);
      } catch (error) {
        console.error('Error al obtener usuario desde el local storage:', error);
        router.push('/');
      }
    };

    obtenerUsuarioDesdeStorage();
  }, []);

  const guardarUsuarioEnStorage = async (usuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    } catch (error) {
      console.error('Error al guardar usuario en el local storage:', error);
    }
  };

  const login = async (correo, password) => {
    try {
      const response = await fetchData({
        url: `/notitas_auth/api/v1/auth/login`,
        method: 'POST',
        credentials: 'include',
        authRoute: true,
        body: JSON.stringify({
          correo,
          password,
        }),
      });

      const usuario = crearUsuarioByTokenResponse(response);
      guardarUsuarioEnStorage(usuario);
      setUsuario(usuario);
      router.push('/');
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  const register = async (nombre, correo, password) => {
    try {
      const response = await fetchData({
        url: `/notitas_auth/api/v1/auth/registro`,
        method: 'POST',
        credentials: 'include',
        authRoute: true,
        body: JSON.stringify({
          nombre,
          correo,
          password,
        }),
      });

      const usuario = crearUsuarioByTokenResponse(response);
      guardarUsuarioEnStorage(usuario);
      setUsuario(usuario);
      router.push('/');
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  const logout = async () => {
    try {
      await fetchData({
        url: '/notitas_auth/api/v1/auth/logout',
        method: 'POST',
        credentials: 'include',
        authRoute: true,
      });

      await AsyncStorage.removeItem('usuario');
      setUsuario(null);
      router.push('/landing');
    } catch (error) {
      console.error('Error en el logout:', error);
    }
  };

  const auth = { usuario, setUsuario, usuarioVerificado, login, register, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };