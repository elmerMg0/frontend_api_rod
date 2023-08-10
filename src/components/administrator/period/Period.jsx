import React, { useEffect, useState } from 'react'
import BoxOpening from './BoxOpening'
import '../../../styles/administracion/period.css'
import { APISERVICE } from '../../../services/api.services'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../redux/states/user'
import BoxClosing from './BoxClosing'
import { Toaster, toast } from 'react-hot-toast'
import PeriodPdfViewer from './PeriodPdfViewer'
const Period = () => {

  const user = useSelector(store => store.user);
  const periodUser = useSelector(store => store.user.periodUser); 
  const dispatch = useDispatch();
  const [infoBoxClose, setInfoBoxClose] = useState({});
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  const [fullCount, setFullCount] = useState(0)

  useEffect(() => {
    getDetailPeriod();
  }, [])

  const openBox =  async ( initialAmount ) => {
    let url = 'periodo/start-period/?'
    let params = `userId=${user.id}`;
    const { period , success, message} = await APISERVICE.post({cajaInicial:initialAmount}, url, params);
    if(success){
      messageToast(message);
      const periodData = {
        periodUser: {
          id: period.id,
          state: period.estado
        }
      }
      dispatch(updateUser( periodData ));
      getDetailPeriod();
    }else{
      messageToastError(message);
    }
  }

  const messageToastError = (sms) => {
    toast.error(sms)
  }
  const closeBox = async ( total ) => {
    let url = 'periodo/close-period?';
    let params = `idPeriod=${periodUser.id}&idUser=${user.id}`;
    const { success, message } = await APISERVICE.post({totalCierreCaja: total}, url, params)
    if(success){
      messageToast(message)
      const periodData = {
        periodUser: {
          id: null,
          state: false
        }
      }
      dispatch(updateUser(periodData))
      setShowPdfViewer(true);
    }
  }

  const getDetailPeriod = async () => {
    let url = 'periodo/get-detail-period/?';
    if(periodUser.id !== null){
      let params = `idUser=${user.id}&idPeriod=${periodUser.id}`
      const { success, info} = await APISERVICE.get(url, params);
      if( success ) {
         setInfoBoxClose(info);
        }
    }
  }

  const messageToast = (message) => {
    toast.success(message);
  };

  return (
      <div className='period'>
        {
          periodUser.state ?
          <BoxClosing closeBox={closeBox} infoBoxClose={infoBoxClose} setFullCount={setFullCount}/>
          :
          <BoxOpening openBox={openBox}/>
        }
        { showPdfViewer && infoBoxClose && Object.keys(infoBoxClose).length > 0 && <PeriodPdfViewer infoPeriod={infoBoxClose} setShow={setShowPdfViewer} fullCount={fullCount}/>}
        <Toaster position='top-right'/>
      </div> 
  )
}

export default Period