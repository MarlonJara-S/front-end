import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appApi from "../api/appApi";

const Table = ({ headers = [], data = [] }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(data);
    }, [data]); 

    const handleEditClick = (userId) => {
        navigate(`/users/${userId}`);
    };

    const handleCheckboxChange = async (userId) => {
        setTableData((prevData) =>
            prevData.map((user) =>
                user.id === userId ? { ...user, is_active: !user.is_active } : user
            )
        );

        try {
            await appApi.post(`/users/${userId}/deactivate/`);
        } catch (error) {
            console.error("Error al actualizar el estado del usuario:", error);
            setTableData((prevData) =>
                prevData.map((user) =>
                    user.id === userId ? { ...user, is_active: !user.is_active } : user
                )
            );
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                        {user?.role === "admin" && (
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 ? (
                        tableData.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b border-gray-200 hover:bg-gray-50"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                >
                                    {item.username}
                                </th>
                                <td className="px-6 py-4">{item.first_name}</td>
                                <td className="px-6 py-4">{item.last_name}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.role}</td>
                                <td className="px-6 py-4">{item.phone}</td>
                                <td className="px-6 py-4">{item.gender}</td>
                                <td className="px-6 py-4">
                                    <label className="inline-flex items-center me-5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                            checked={item.is_active}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {item.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </label>
                                </td>
                                {user?.role === "admin" && (
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => handleEditClick(item.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length + 1} className="px-6 py-4 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
