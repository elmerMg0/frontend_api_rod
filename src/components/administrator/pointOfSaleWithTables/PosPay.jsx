import { useSelector } from "react-redux";
import { useContext } from "react";
import { OrderDetailContext } from "../../../context/orderDetail";
import { toast } from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const PosPay = ( { setShowModal, getTables, setShowPos } ) => {

  const { confirmSale, infoCollectMoney, loadingEndSale, infoSale, loading } = useContext(OrderDetailContext);
  const  { totalPrice } = infoCollectMoney;

  const user = useSelector(store => store.user)

  const handleConfirmSale = async ( ) => {
    if(user.id !== infoSale.usuario_id){
      toast.error('Usuario incorrecto')
      return
    }

    if(totalPrice > 0 && !loadingEndSale && !loading){
        await confirmSale(totalPrice);
        setShowPos(false);
        await getTables();
      }
  }

  const handleCollect = () => {
    setShowModal(true)
  }

  return (
    <div className="pos-pay">
        <div className="pos-pay__coins">
          <button className="btn-main" onClick={handleConfirmSale}>
          {
            loadingEndSale ? 
            <div className='content-loader content-loader--collect'>
              <Spinner variant='light' animation='border' size="sm"/>
            </div>
            :
            "Cobrar"
          }
          </button>
        </div>
        <div className="pos-pay__btns">
           <button onClick={handleCollect} className="btn-main-green">Cobrar</button>
        </div>
      </div>
  )
}

export default PosPay