import React, { useEffect, useState } from 'react'
import InventaryTable from './InventaryTable'
import { APISERVICE } from '../../../services/api.services'
import ProductTable from './ProductTable'
import './inventary.css'
import Seeker from './Seeker'

export const MyContext = React.createContext(null);

const Inventary = () => {

    const [products, setProducts] = useState([])
    const [inventaries, setInventaries] = useState()
    const [pageInfo, setPageInfo] = useState({})
    const [productsToEdit, setProductsToEdit] = useState([])

    useEffect( () => {
        getProducts();
        getInventaries();
    }, []) 

    const getInventaries  = async (pageNumber = 1) => {
        const url = 'inventario/index/?';
        const params = `page=${pageNumber}`
        const { success, pageInfo, inventaries } = await APISERVICE.get(url, params);
        if( success) {
                setInventaries(inventaries)
                setPageInfo(pageInfo);
        }
    }

    const getProducts = async () => {
        const url = 'producto/products';
        const { success, products } = await APISERVICE.get(url);
        if(success){
            setProducts(products);
        }else{
            
        }
    }

    const createInventary = async () => {
        const url = 'inventario/create';
        const { success } = await APISERVICE.post(productsToEdit , url);
        if( success ){  
            setProductsToEdit([]);
            getProducts();
            getInventaries();
        }
    }

  return (
    <MyContext.Provider value={{productsToEdit, setProductsToEdit, createInventary}}>
        <section className='inventary'>
            <h3 className='title'>Inventarios</h3>
            <Seeker products={products}/>
            <ProductTable products={productsToEdit} createInventary={createInventary}/>
            <button className='btn-main mb-4 mt-2' onClick={createInventary}>Guardar</button>
            <h3 className='title'>Registro de inventarios</h3>
            <InventaryTable inventaries={inventaries} pageInfo={pageInfo} getInventaries={getInventaries}/>
        </section>
    </MyContext.Provider>
  )
}

export default Inventary