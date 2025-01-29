import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { ToastContainer, toast } from 'react-toastify';

const registerFormField = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: ""
};

export const RegisterForm = () => {
    const { startRegister, errorMessage } = useAuthStore(); 
    const navigate = useNavigate()
    const { username, first_name, last_name, email, password, confirmPassword, phone, gender, onInputChange:onRegisterInputChange } = useForm( registerFormField )

    const registerSubmit = async(e) => {
        e.preventDefault();
        const success = await startRegister({ username, first_name, last_name, email, password, confirmPassword, phone, gender });
        if (success) {
            navigate('/auth/login'); 
        }
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }, [errorMessage])

  return (
    <div className="flex h-[100vh] p-4 justify-center items-center">
      <div className="flex justify-center items-center w-full h-full rounded-md border border-black/10 bg-yellow-300/90">
        <img  className="w-2/4" src={'https://extensions.vtexassets.com/arquivos/ids/156473-800-auto?v=637273976727030000&width=800&height=auto&aspect=true'} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full bg-blackc-950 rounded-lg p-4">
        
        <form
          onSubmit={registerSubmit}
          className="grid grid-cols-2 grid-rows-1 p-6 gap-6 bg-white border border-black/10 shadow-xl rounded-md justify-center w-full max-w-lg items-center"
          action=""
        >
            <div className="flex flex-col gap-y-3 col-span-2 justify-start items-start">
                <img className="w-40 mb-4" src={"https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png"} alt="" />
                <h1 className="text-3xl font-semibold text-black/80">Registrate en nuestra plataforma</h1>
                <p className="text-black/50 font-semibold text-sm">Bienvenido a nuestra plataforma! Registrate ahora</p>
            </div>
            
          <div className="flex flex-col gap-y-2 col-span-2">
            <label className="font-medium text-black/80 text-sm">Usuario *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su usuario"
              type="text"
              name="username"
              value={username}
              onChange={onRegisterInputChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="font-medium text-black/80 text-sm">Nombre *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su nombre"
              type="text"
              name="first_name"
              value={first_name}
              onChange={onRegisterInputChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="font-medium text-black/80 text-sm">Apellido *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su apellido"
              type="text"
              name="last_name"
              value={last_name}
              onChange={onRegisterInputChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-2">
            <label className="font-medium text-black/80 text-sm">Correo electronico *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su correo electronico"
              type="email"
              name="email"
              value={email}
              onChange={onRegisterInputChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="font-medium text-black/80 text-sm">Teléfono *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su número de teléfono"
              type="number"
              name="phone"
              value={phone}
              onChange={onRegisterInputChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="font-medium text-black/80 text-sm">Género *</label>
            <select
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 px-3 rounded-md"
              name="gender"
              value={gender}
              onChange={onRegisterInputChange}
            >
              <option value="">Seleccione su género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="font-medium text-black/80 text-sm">Contraseña *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su contraseña"
              type="password"
              name="password"
              value={password}
              onChange={onRegisterInputChange}
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="font-medium text-black/80 text-sm">Confirmar Contraseña *</label>
            <input
              className="text-sm border border-black/40 outline-none focus:border-blue-500 focus:border-2 bg-transparent h-9 p-3 rounded-md"
              placeholder="Confirme su contraseña"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onRegisterInputChange}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 rounded-md text-blackc-800  p-2 col-span-2 bg-blackc-100 border-none text-white">
            Registrarse
          </button>
        </form>
        <footer className="text-center mt-4">
        <p className="text-black/80 text-sm">
            ¿Ya tiene una cuenta?{" "}
            <Link to="/auth/login/" className="text-blue-500 hover:underline">
              Iniciar sesión
            </Link>
            .
          </p>
        </footer>
      </div>
        <ToastContainer />
    </div>
  );
};