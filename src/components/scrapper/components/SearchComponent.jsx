import React, { useState } from 'react';
import axios from 'axios';
import { appApi } from '../../../api';
import { Recomendations } from './Recomendations';
import { Products } from './Products';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [suggest, setsuggest] = useState(null);
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await appApi.get(`/search/?query=${query}`);
      setsuggest(response.data.suggest);
      setProducts(response.data.products || []);
    } catch (error) {
      setsuggest(null);
      setProducts([]);
    }
  };

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
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]  grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="flex justify-items-start items-center row-span-1 gap-2 bg-yellow-300 col-span-1 md:col-span-3 p-4 border border-black/10 rounded-md shadow-md">
        <div className='w-26 h-10 flex justify-center items-center'>
          <img  src={'https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png'} alt="" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto"
          className="border border-black/15 shadow-md rounded-md p-2 w-full bg-white"
        />
        <button className='bg-black h-full text-xs rounded-full p-2 cursor-pointer text-white flex items-center justify-center' onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      <div className="row-span-1 col-span-1">
        <Recomendations sugerencia={suggest} />
      </div>
      <div className="row-span-1 col-span-2">
        <Products products={products} addToWishlist={addToWishlist} />
      </div>
    </div>
  );
};

export default SearchComponent;