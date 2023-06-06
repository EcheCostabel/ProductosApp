import { useState, useEffect } from 'react';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

export const useCategorias = () => {
  
    const [ categories, setCategories ] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async( ) => {
        const resp = await cafeApi.get<CategoriesResponse>('/categorias');
        setCategories(resp.data.categorias)
    }

    return {
        categories
    }

}  
