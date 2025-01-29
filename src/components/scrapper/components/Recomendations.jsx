import React from 'react';
import { appApi } from '../../../api';

export const Recomendations = ({ sugerencia }) => {
    const addToWishlist = async (product) => {
        try {
            const productData = {
                nombre: product.name,
                precio: product.price,
                imagen: product.image_url,
                url: product.product_url,
            };
            await appApi.post('/wishlist/', productData);
            alert('Product added to wishlist');
        } catch (error) {
        }
    };

    return (
        <div className=' gap-4 w-auto bg-white border border-black/10 p-4 rounded-md shadow-md'>
            {sugerencia && (
                <div className="gap-4 grid grid-cols-1 w-auto ">
                    <div className="mb-4 border border-black/10 p-4 relative rounded-md shadow-md">
                        <p className='font-normal flex justify-center text-center text-lg bg-blue-100 p-1 px-6 w-[50%] text-blue-500  rounded-sm'>Precio mas bajo</p>
                        <div className='flex justify-between items-center gap-4 mt-4'>
                            <img
                                src={sugerencia.articulo_precio_mas_bajo?.image_url}
                                alt={sugerencia.articulo_precio_mas_bajo?.name}
                                className="w-24 h-24 mb-2"
                            />
                            <div className="flex flex-col">
                                <p>{sugerencia.articulo_precio_mas_bajo.name}</p>
                                <p className='font-semibold text-lg'>${sugerencia.articulo_precio_mas_bajo.price}</p>
                            </div>
                        </div>
                        <button onClick={() => addToWishlist(sugerencia.articulo_precio_mas_bajo)} className="bg-yellow-500 rounded-full hover:bg-white hover:border hover:text-amber-400 transition  w-9 h-9 text-white absolute top-0 right-0 m-2 text-2xl cursor-pointer">
                        ★
                        </button>
                    </div>

                    <div className="mb-4 border border-black/10 p-4 relative rounded-md shadow-md">
                        <p className='font-normal flex justify-center text-center text-lg bg-blue-100 p-1 px-6 w-[50%] text-blue-500  rounded-sm'>Precio mas alto:</p>
                        <div className='flex justify-between items-center gap-4 mt-4'>
                            <img
                                src={sugerencia.articulo_precio_mas_alto?.image_url}
                                alt={sugerencia.articulo_precio_mas_alto?.name}
                                className="w-24 h-24 mb-2"
                                />
                                <div className="flex flex-col">
                                    <p>{sugerencia.articulo_precio_mas_alto.name}</p>
                                    <p className='font-semibold text-lg'>${sugerencia.articulo_precio_mas_alto.price}</p>
                                </div>
                        </div>
                        
                        <button onClick={() => addToWishlist(sugerencia.articulo_precio_mas_alto)} className="bg-yellow-500 rounded-full hover:bg-white hover:border hover:text-amber-400 transition  w-9 h-9 text-white absolute top-0 right-0 m-2 text-2xl cursor-pointer">
                        ★
                        </button>
                    </div>

                    <div className="mb-4 border border-black/10 p-4 relative rounded-md shadow-md">
                        <p className='font-normal flex justify-center text-center text-lg bg-blue-100 p-1 px-6 w-[50%] text-blue-500  rounded-sm'>Mayor descuento:</p>
                        <div className='flex justify-between items-center gap-4 mt-4'>
                            <img
                                src={sugerencia.articulo_descuento_mas_alto?.image_url}
                                alt={sugerencia.articulo_descuento_mas_alto?.name}
                                className="w-24 h-24 mb-2"
                            />
                            <div className="flex flex-col">
                                <p>{sugerencia.articulo_descuento_mas_alto.name} - {sugerencia.articulo_descuento_mas_alto?.discount}%</p>
                                <p className='font-semibold text-lg'>${sugerencia.articulo_descuento_mas_alto.price}</p>
                            </div>
                        </div>
                        <button onClick={() => addToWishlist(sugerencia.articulo_descuento_mas_alto)} className="bg-yellow-500 rounded-full hover:bg-white hover:border hover:text-amber-400 transition  w-9 h-9 text-white absolute top-0 right-0 m-2 text-2xl cursor-pointer">
                        ★
                        </button>
                    </div>

                    <div className="mb-4 border border-black/10 p-4 relative rounded-md shadow-md">
                        <p className='font-normal flex justify-center text-center text-lg bg-blue-100 p-1 px-6 w-[50%] text-blue-500  rounded-sm'>Mejor valoracion:</p>
                        <div className='flex justify-between items-center gap-4 mt-4'>
                            <img
                                src={sugerencia.articulo_mejor_calificacion?.image_url}
                                alt={sugerencia.articulo_mejor_calificacion?.name}
                                className="w-24 h-24 mb-2"
                            />

                            <div className="flex flex-col">
                                <p>{sugerencia.articulo_mejor_calificacion?.name} - {sugerencia.articulo_mejor_calificacion?.rating}</p>
                            </div>                        
                        </div>
                        <button onClick={() => addToWishlist(sugerencia.articulo_mejor_calificacion)} className="bg-yellow-500 rounded-full hover:bg-white hover:border hover:text-amber-400 transition  w-9 h-9 text-white absolute top-0 right-0 m-2 text-2xl cursor-pointer">
                        ★
                        </button>
                    </div>
                    <div>
                        <p>Precio promedio</p>
                        <p>
                            <strong>Precio promedio:</strong> ${sugerencia.precio_promedio?.toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};