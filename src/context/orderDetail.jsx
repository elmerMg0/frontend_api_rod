import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import { usePrinter } from "../hooks/usePrinter";
import { APISERVICE } from "../services/api.services";
import { idCustomerGeneric, loungeStates, messages, printerType, saleStates } from "../utilities/constans";
import { toast } from "react-hot-toast";

export const OrderDetailContext = createContext();

const InitialInfoCollectMoney = {
  totalPrice: 0,
  totalPaid: 0,
  payType: '',
  change: 0
}
const initialInfoSale = {
  nota: "",
}

export function useOrderDetail (){
    const [infoCollectMoney, setInfoCollectMoney] = useState(InitialInfoCollectMoney)
    const [orderDetail, setOrderDetail] = useState([])
    const [orderDetailNew, setOrderDetailNew] = useState([])
    const [tableSelected, setTableSelected] = useState({})
    const [infoSale, setInfoSale] = useState(initialInfoSale);
    const [customerSelected, setCustomerSelected] = useState({});
    //const { print } = usePrinter();
    const [loading, setLoading] = useState(false);
    const [loadingEndSale, setLoadingEndSale] = useState(false)
    const user = useSelector(store => store.user)

    /* Feching */

    const sendOrder = async () => {
      if(infoSale.id){
        if(user.id !== infoSale.usuario_id){
          messageToastError('Usuario incorrecto')
          return;
        }
        updateSale();
      }else{
        //crear
        createSale()
      }
    }

    const confirmSale = async () => {
      await updateSale();
      try {
          setLoadingEndSale(true);
          let url = "venta/confirm-sale/?";
          let params = `idSale=${infoSale.id}`;
          let body = {
            cantidad_total: infoCollectMoney.totalPrice,
            cantidad_cancelada: infoCollectMoney.totalPaid,
            estado: "pagado",
            tipo_pago: infoCollectMoney.payType.length > 0 ? payType : "efectivo",
            tipo: "local",
            usuario_id: infoSale.usuario_id
            };
        
          const { success } = await APISERVICE.post(body, url, params);
          if (success) {
            toast.success("Pedido enviado correctamente");
            const confirmSaleInfo = {
              nroPedido: infoSale.numero_pedido,
              nroMesa: tableSelected.nombre,
              cliente: customerSelected.nombre
              ? customerSelected.nombre
              : "generico",
              cantidadTotal: Number(infoCollectMoney.totalPrice),
              idSale: infoSale.id
              
            } 
            //print(printerType.SALON, [...orderDetailNew], [...orderDetail], confirmSaleInfo);
            cleanTableInfo();
          }

      } catch (error) {
        messageToastError('Ocurrio un error')
      }finally{
        setLoadingEndSale(false)
      }
    }

    const updateSale = async (idSale = infoSale.id, nroOrder = infoSale.numero_pedido) => {
      try {
        setLoading(true);
        const url = "venta/update-sale/?";
        const params = `idSale=${idSale}`;
        const body = {
          orderDetail: orderDetail,
          note: infoSale.nota?? "",
          //cliente_id: customerSelected.id ?? idCustomerGeneric,
        };
        const { success, message } = await APISERVICE.post(body,url,params);
        if (success) {
          messageToastSuccess(message);
          /* const confirmSaleInfo = {
            nroPedido: nroOrder,
            nroMesa: tableSelected.nombre,
            cliente: customerSelected.nombre
            ? customerSelected.nombre
            : "generico",
            cantidadTotal: Number(infoCollectMoney.totalPrice),
            idSale
            
          }  */
          //print(printerType.COCINA, [...orderDetailNew], [...orderDetail], confirmSaleInfo);
          setOrderDetail( orderDetail.map(prod => {
            prod.estado = saleStates.ENVIADO;
            return prod;
          }))
          setOrderDetailNew([]);
        }
      } catch (error) {
        messageToastError('Ocurri un error');
        //setOrderDetail( orderDetail.map(prod => prod.estado = 'enviado'))
      }finally{
        setLoading(false)
      }
    }

    const createSale = async () => {
      if(orderDetail.length === 0) return;
      
      try {
        setLoading(true);
        const url = "venta/create-sale/?";
        const body = {
          usuario_id: user.id,
          estado: loungeStates.CONSUMIENDO,
          mesa_id: tableSelected.id,
          //cliente_id: customerSelected.id ?? idCustomerGeneric,
        };
        const { success, sale } = await APISERVICE.post(
          body,
          url,
        );
        if (success) {
          setInfoSale(prevState => ({ ...prevState, ...sale}));
          updateSale(sale.id, sale.numero_pedido)
        } 
      } catch (error) {
        messageToastError('Ocurrio un error');
      }finally{
        setLoading(false)
      }
  
    }

    const getInformationSale = async () => {
      if(!tableSelected.id)return;
      const url = 'venta/get-information-sale/?';
      const params = `idTable=${tableSelected.id}`
      const { success, sale, saleDetails, customer } = await APISERVICE.get(url, params);
      if( success ){
        setInfoSale({...sale, nota: ''});
        setOrderDetail(saleDetails)
        setCustomerSelected(customer)
      }
    }


    /* Cambio de estado */
    const addProductOrder = (product ) => {
        const valid = updateOrderDetail({...product}, [...orderDetail], setOrderDetail);
        if(valid)updateOrderDetail({...product}, [...orderDetailNew], setOrderDetailNew)
    }

    const updateOrderDetail = (product, orderDetailCopy, set) => {
        const index = orderDetailCopy.findIndex(prod => prod.id === product.id);
        if(index !== -1){
          const productFinded = orderDetailCopy[index];
          if(productFinded.tipo === 'bebida' && productFinded.cantidad === productFinded.stock ){
            messageToastError(messages.STOCK)
            return false;
          }
          orderDetailCopy[index].cantidad++;
          set([...orderDetailCopy]);
        }else{
          if(product.stock > 0 || product.tipo === 'comida'){
            set([{ ...product, estado: 'nuevo', cantidad: 1}, ...orderDetailCopy ]);
          }
        } 
        return true;
      }
 
    const incrementProduct = (product) => {
      const otherProduct = {...product};
      const index = orderDetail.findIndex(prod => prod.id === otherProduct.id);
  
      if(otherProduct.cantidad > 100)return
      if(otherProduct.tipo === 'bebida' && otherProduct.cantidad === otherProduct.stock )return
      orderDetail[index].cantidad++;
      setOrderDetail([...orderDetail])
      updateOrderDetail({...product}, orderDetailNew, setOrderDetailNew);
      //handlePlusQuantityNew({...product})
    }

    const decrementQuantityProduct = (product) => {
      decrementQuantityFunction({...product}, [...orderDetail], setOrderDetail);
      decrementQuantityFunction(product, [...orderDetailNew], setOrderDetailNew);
    }

    const decrementQuantityFunction = (product, orderCopy, set) => {
      orderCopy.map((prod) => {
        if (prod.id === product.id && prod.cantidad > 1) {
          prod.cantidad -= 1;
        }
      });
      set([...orderCopy]);
    }

    const deleteProduct = (product) => {
      setOrderDetail(orderDetail.filter((prod) => prod.id !== product.id));
      setOrderDetailNew(orderDetailNew.filter((prod) => prod.id !== product.id));
    }

    const updateTotalPrice = () => {
      let totalPrice = orderDetail.reduce(
          (ac, prod) => ac + prod.cantidad * prod.precio_venta,
          0
        );
      setInfoCollectMoney(prevState => ({...prevState, totalPrice: totalPrice, totalPaid: totalPrice }))
    };

    const cleanTableInfo = () => {
      setInfoSale(initialInfoSale);
      setOrderDetail([]);
      setOrderDetailNew([]);
      setCustomerSelected({})
      setTableSelected({})
      setInfoCollectMoney(InitialInfoCollectMoney)
    }

    /* Mensajes */
    const messageToastSuccess = (sms) => {
      toast.success(sms);
    };

    const messageToastError = (sms) => {
      toast.error(sms);
    };

    useEffect(() => {
      getInformationSale()
    },[tableSelected])

    useEffect(() => {
      updateTotalPrice()
    },[orderDetail])


    return { loadingEndSale, loading, customerSelected, setCustomerSelected, cleanTableInfo, setInfoCollectMoney, infoCollectMoney, confirmSale,  sendOrder,  setInfoSale, infoSale, setTableSelected, tableSelected, orderDetail, addProductOrder, deleteProduct, incrementProduct, decrementQuantityProduct  }
}


export function OrderDetailProvider ({ children }){
    //que compartir
    const {loadingEndSale, loading, customerSelected, setCustomerSelected,setInfoSale, cleanTableInfo, setInfoCollectMoney, infoCollectMoney, confirmSale, sendOrder, infoSale,  setTableSelected, addProductOrder,tableSelected, orderDetail, addNewProduct, deleteProduct, incrementProduct, decrementQuantityProduct } = useOrderDetail();
    return (
        <OrderDetailContext.Provider
        value={{loadingEndSale, loading ,customerSelected, setCustomerSelected, setInfoSale, cleanTableInfo, setInfoCollectMoney, infoCollectMoney, confirmSale, sendOrder, infoSale, setTableSelected, addProductOrder, tableSelected, orderDetail, addNewProduct, deleteProduct, incrementProduct, decrementQuantityProduct}}>
            {children}
        </OrderDetailContext.Provider>
    )
}