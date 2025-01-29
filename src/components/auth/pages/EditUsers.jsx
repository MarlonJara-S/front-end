import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appApi } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await appApi.get(`/users/${id}/`);
        setFormData(data);
      } catch (error) {
        toast.error("Error al obtener los datos del usuario");
      }
    };
    fetchUser();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await appApi.put(`/users/${id}/`, formData);
      toast.success("Usuario actualizado exitosamente");
      navigate("/users");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      toast.error("Error al actualizar los datos del usuario");
    }
  };

  return (
    <div className="flex bg-white justify-center items-center rounded-lg shadow-sm">
      <div className="flex flex-col w-[100%] justify-center items-center h-full bg-blackc-950 rounded-lg px-24">
        <header className="flex justify-center items-center mb-6 text-center">
          <h1 className="text-3xl font-semibold text-blackc-200">Editar Usuario</h1>
        </header>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-2 grid-rows-6 gap-5 justify-center w-[100%] items-center"
        >
          <div className="flex flex-col gap-y-2 col-span-2">
            <label className="text-blackc-400 text-sm">Usuario:</label>
            <input
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su usuario"
              type="text"
              name="username"
              value={formData.username}
              onChange={onInputChange}
            />
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="text-blackc-400 text-sm">Nombre:</label>
            <input
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su nombre"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={onInputChange}
            />
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="text-blackc-400 text-sm">Apellido:</label>
            <input
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su apellido"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={onInputChange}
            />
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          <div className="flex flex-col gap-y-2 col-span-2">
            <label className="text-blackc-400 text-sm">Correo electrónico:</label>
            <input
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
            />
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="text-blackc-400 text-sm">Teléfono:</label>
            <input
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 p-3 rounded-md"
              placeholder="Ingrese su número de teléfono"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
            />
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          <div className="flex flex-col gap-y-2 col-span-1">
            <label className="text-blackc-400 text-sm">Género:</label>
            <select
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 px-3 rounded-md"
              name="gender"
              value={formData.gender}
              onChange={onInputChange}
            >
              <option value="">Seleccione su género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          
          <div className="flex flex-col gap-y-2 col-span-2">
            <label className="text-blackc-400 text-sm">Rol:</label>
            <select
              className="text-blackc-200 text-sm border border-blackc-600 outline-none focus:border-blue-500 bg-transparent h-9 px-3 rounded-md"
              name="role"
              value={formData.role}
              onChange={onInputChange}
            >
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            <span className="text-blackc-400 text-xs">Campo obligatorio*</span>
          </div>
          <button className="bg-blue-500 rounded-md text-blackc-800 p-2 w-26 bg-blackc-100 border-none text-white">
            Actualizar
          </button>
        

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
