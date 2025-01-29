import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ToastContainer, toast } from 'react-toastify';


const loginFormField = {
    loginEmail: "",
    loginPassword: "",
};


export const LoginForm = () => {
    const { startLogin, errorMessage } = useAuthStore(); 

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormField )

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword});
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }, [errorMessage])

  return (
    <div className="flex h-[100vh] p-4 justify-center items-center rounded-lg shadow-sm">
      <div className="flex justify-center items-center w-full h-full rounded-md border border-black/10 bg-yellow-300/90">
        <img  className="w-2/4" src={'https://extensions.vtexassets.com/arquivos/ids/156473-800-auto?v=637273976727030000&width=800&height=auto&aspect=true'} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full bg-blackc-950 rounded-lg p-4">
          
        <form
          onSubmit={loginSubmit}
          className="grid grid-cols-2 grid-rows-2 p-6 gap-0 bg-white border border-black/10 shadow-xl rounded-md justify-center w-full max-w-lg items-center"
          action=""
        >
          <div className="flex flex-col gap-y-3 col-span-12 justify-start items-start">
            <img className="w-40 mb-4" src={"https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png"} alt="" />
            <h1 className="text-3xl font-semibold text-black/80">Inicia sesión con tu cuenta</h1>
            <p className="text-black/50 font-semibold text-sm">Bienvenido de nuevo! Inicia sesión ahora</p>
          </div>
          <div className="flex flex-col gap-y-2 col-span-12">
            <label className="font-medium text-black/80 text-sm">Correo electronico *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su correo electronico"
              type="email"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
            />
            </div>
          <div className="flex flex-col gap-y-2 col-span-12">
            <label className="font-medium text-black/80 text-sm">Contraseña *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su contraseña"
              type="password"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 rounded-md text-blackc-800 mt-6 p-2 col-span-12 bg-blackc-100 border-none text-white">
            Iniciar sesión
          </button>
        </form>
        <footer className="text-center mt-4">
          <p className="text-black/80 text-sm">
            No tiene una cuenta?{" "}
            <Link to="/auth/register/" className="text-blue-500 hover:underline">
              Registrate
            </Link>
            .
          </p>
        </footer>
      </div>
        <ToastContainer />
    </div>
  );
};

