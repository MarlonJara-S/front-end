import React, { useState } from 'react';

export const Products = ({ products, addToWishlist }) => {

    const [check, setCheck] = useState(false)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white border border-black/10 p-4 rounded-md shadow-md overflow-y-auto ">
            {products.length > 0 && (
                products.map((product, index) => (
                    <div key={index} className="mb-4 border border-black/10 p-4 relative rounded-md shadow-md">
                        <figure className="mb-4 flex justify-center">
                            <img 
                                src={product.image_url}
                                alt={product.name} 
                                className="w-full h-full object-cover mb-2" 
                            />
                        </figure>
                        <div className='flex flex-col gap-y-2'>
                            <span className='font-semibold'>{product.seller}</span>
                            <p className='text-sm  text-black/75'>{product.name}</p>
                            <span className='text-xs text-black/70'>Por {product.seller}</span>
                            <div className='flex justify-between items-center'> 
                                <p className='font-semibold text-2xl'>${product.price}</p>
                                <p className='text-green-600'>{product.discount || 0}% OFF</p>
                            </div>
                         
                            <p>{product.rating}</p>
                            <a href={product.product_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Ver producto</a>
                        </div>

                        <button onClick={() => addToWishlist(product) } className="bg-yellow-500 rounded-full hover:bg-white hover:border hover:text-amber-400 transition  w-9 h-9 text-white absolute top-0 right-0 m-2 text-2xl cursor-pointer">★</button>
                    </div>
                ))
            )}
        </div>
    );
};
