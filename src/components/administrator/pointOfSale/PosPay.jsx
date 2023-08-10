
const PosPay = ( { createSale, totalPrice, setShowModal, accumulate, setAccumulate, setTotalPaid } ) => {


  const handleAccumalateAcount = ( value ) => {
    if(totalPrice > 0){
      if( accumulate + value >= totalPrice ){
        createSale(accumulate + value);
        setAccumulate(0);
        setTotalPaid(0)
      }else{
        setAccumulate(accumulate  + value);
      }
    }
  }

  const handleCollect = () => {
    setShowModal(true)
  }

  return (
    <div className="pos-pay">
        <div className="pos-pay__coins">
          <button className="btn-main" onClick={() => handleAccumalateAcount(1)}>Bs/. 1</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(5)}>Bs/. 5</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(10)}>Bs/. 10</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(20)}>Bs/. 20</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(50)}>Bs/. 50</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(100)}>Bs/. 100</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(200)}>Bs/. 200</button>
          <button className="btn-main" onClick={() => handleAccumalateAcount(totalPrice)}>Exacto</button>
        </div>
        <div className="pos-pay__btns">
          {totalPrice > 0 ? 
          <button onClick={handleCollect} className="btn-main-green">Cobrar</button>
          :
          <button disabled  onClick={handleCollect} className="btn-main-green">Cobrar</button>
          }
          {/* <button className="btn-main-red">Salir</button> */}
        </div>
      </div>
  )
}

export default PosPay