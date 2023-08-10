import { Modal } from "react-bootstrap";
import "../../../../styles/carrito/categorywproducts.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductCarrito } from "../../../../redux/states/carritoUser";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  id: "",
  cantidad: 0,
};

const ModalOrderDetail = ({ show, setShow, category, setCategory}) => {
  const [products, setProducts] = useState([]);
  const [productsSelected, setProductsSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    /*Actuazliar products */
    setProducts(
      products.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad += 1;
        }
        return prod;
      })
    );
    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    setTotalPrice(
      products.reduce(
        (ac, value) => ac + value.cantidad * value.precio_venta,
        0
      )
    );
  };
  const handleDecrement = (product) => {
    if (product.cantidad > 0) {
      setProducts(
        products.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad -= 1;
          }
          return prod;
        })
      );
    }
    updateTotalPrice();
  };
  const handleOnChange = (product, e) => {
   /*  console.log(e.target.value)
    if (product.cantidad > 0 && e.target.value < 200) {
      setProducts(
        products.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad = e.target.value;
          }
          return prod;
        })
      );
    }
    updateTotalPrice(); */
  };

  useEffect(() => {
    if (category.productos && category.productos.length > 0) {
      setProducts(
        category.productos.map((prod) => {
          return { ...prod, cantidad: 0 };
        })
      );
    }
  }, [show]);

  const handleClose = () => {
    setProducts([]);
    setProductsSelected([]);
    setShow(false);
    setTotalPrice(0);
    setCategory([])
  };

  const handleAddCar = () => {
    /* validar */
    const productsSelected = products.filter( prod => prod.cantidad > 0);
    if(productsSelected.length > 0){
      /* Agregar modal personalizado de confirmacion */
      dispatch(addProductCarrito(productsSelected));
      setShow(false);
      setProducts([])
      setTotalPrice(0)
      setCategory([])
    }else{
      messageToastError('Agrege un producto')
    }
  };

  const messageToastSuccess = (sms) => {
    toast.success(sms);
  }

  const messageToastError = (sms) => {  
    toast.error(sms)
  }

  return (
    <Modal show={show} centered>
      <Modal.Header style={{alignItems: 'start'}}>
        <div>
          <h5>{category.nombre}</h5>
          <p>{category.descripcion}</p>
        </div>
        <p onClick={handleClose} className="btn-close"></p>
      </Modal.Header>
      <Modal.Body>
        {products && products.length > 0
          ? products.map((prod) => {
              return (
                <div className="modal-product-row" key={prod.id}>
                  <p className="modal-product-row__name">{prod.nombre}</p>
                  <p>{`${prod.precio_venta}.00 Bs.`}</p>
                  <div className="moda-product-row__btns">
                    <button onClick={() => handleDecrement(prod)}>-</button>
                    <input
                      type="number"
                      value={prod.cantidad}
                      onChange={(e) => handleOnChange(e)}
                      placeholder="0"
                      readOnly
                    />
                    <button onClick={() => handleIncrement(prod)}>+</button>
                  </div>
                </div>
              );
            })
          : "agotado."}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-add" onClick={handleAddCar}>
          Agregar Bs. {totalPrice}
        </button>
      </Modal.Footer>
      <Toaster/>
    </Modal>
  );
};
export default ModalOrderDetail;
