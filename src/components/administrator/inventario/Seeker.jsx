import { useContext, useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { MyContext } from "./Inventary";

const Seeker = ({products}) => {
  /*   const [customerSelected, setCustomerSelected] = useState({}) */
    const [productFilter, setProductFilter] = useState([])
    const [productInput, setProductInput] = useState('')
    const { productsToEdit, setProductsToEdit } = useContext(MyContext)
    const inputRef = useRef(null);
  /*   const handleOnChange = (e) => {
        setCustomerSelected(e.target.value);
    } */
  /*   const handleOnSave = () => {
        setCustomer(customerSelected);
        onHide(false);
    } */

    const handleOnChange = (e) => {
        const value = e.target.value;
        setProductInput(value);
        setProductFilter(products.filter( del => del.nombre.toLowerCase().includes(value.toLowerCase())));
        if(value === ''){
            setProductFilter([]);
        }
    }
    const handleDeliverySeleted = (product) => {
        setProductFilter([]);
        let exists = productsToEdit.find( prod => prod.id === product.id );
        if( !exists ){
            product.newStock = 0;
            setProductsToEdit([...productsToEdit, product])
        }
        setProductInput(product.nombre);
    }

    const handleClear = () => {
        setProductInput('');
    }

    useEffect(() => {
          inputRef.current.focus();
      }, []);
    
    
    return (
        <>
        <p>Seleccione un producto</p>
        <div className="d-flex gap-2">
            <InputGroup>
                <Form.Control
                    placeholder='Nombre de producto'
                    type='text'
                    onChange={handleOnChange}
                    name='productInput'
                    value={productInput}
                    ref={inputRef}
                />
            {
                productFilter && productFilter.length > 0 && 
            <div className='delivery-filtered'>
                {
                    productFilter.map(prod => <p key={prod.id} onClick={() => handleDeliverySeleted(prod)}>{prod.nombre}</p>)
                }
            </div>
            }
            </InputGroup>   
            <button className="btn-main" onClick={handleClear}>Limpiar</button>

        </div>
        </>
    )
}
export default Seeker;