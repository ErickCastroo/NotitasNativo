import { useState } from "react";
import { ApiManager } from "./apimanager";

const login = async (correo, password) => {

  const [usuario, setUsuario] = useState('');
  try {
    const response = await fetchData({
      url: `/notitas_auth/api/v1/auth/login`,
      method: 'POST',
      credentials: 'include',
      authRoute: true,
      body: JSON.stringify({
        correo,
        password
      })
    });

    const usuario = crearUsuarioByTokenResponse(response);
    guardarUsuarioEnStorage(usuario);
    setUsuario(usuario);
    router.push('/');
  } catch (error) {
    console.error('Error en el login:', error);
  }
};

export { login }