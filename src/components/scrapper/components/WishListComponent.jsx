import React, { useEffect, useState } from 'react';
import appApi from '../../../api/appApi';
import { Link } from 'react-router-dom';

const WishListComponent = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await appApi.get('/wishlist/');
                setWishlist(response.data);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
        console.log(wishlist);
        
    }, []);

    const removeFromWishlist = async (id) => {
        try {
            await appApi.delete(`/wishlist/${id}/`);
            setWishlist(wishlist.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-white border border-black/10 p-4 rounded-md shadow-md overflow-y-auto">
            {wishlist.length > 0 ? (
                wishlist.map((item, index) => (
                    <div key={index} className="mb-4 border border-black/10 p-4 relative rounded-md shadow-md">
                        <figure className="mb-4 flex justify-center">
                            <img 
                                src={item.imagen}
                                alt={item.nombre} 
                                className="w-full h-full object-cover mb-2" 
                            />
                        </figure>
                        <div className='flex flex-col gap-y-2'>
                            <p className='text-sm text-black/75'>{item.nombre}</p>
                            <div className='flex justify-between items-center'> 
                                <p className='font-semibold text-2xl'>${item.precio}</p>
                            </div>
                            <Link to={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Ver producto</Link>
                        </div>
                        <button onClick={() => removeFromWishlist(item.id)} className="bg-red-500 rounded-full hover:bg-white hover:border hover:text-red-400 transition w-9 h-9 text-white absolute top-0 right-0 m-2 text-2xl cursor-pointer">✕</button>
                    </div>
                ))
            ) : (
                <p>No hay items en la lista de deseos</p>
            )}
        </div>
    );
};

export default WishListComponent;