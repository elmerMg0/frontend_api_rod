import React, { useEffect, useState } from 'react'
import { APISERVICE } from '../../../services/api.services';
import CurrentInventaryTable  from './CurrentInventaryTable'
import './currentInventary.css'
const CurrentInventary = () => {
    const [inventaries, setInventaries] = useState([])
    const [pageInfo, setPageInfo] = useState({})

    useEffect(() => {
        getCurrentInventaries()
    },[])

    const getCurrentInventaries = async (page=1) => {
        const url = 'inventario/get-current-inventary/?';
        const params = `page=${page}`
        const { success, inventaries, pageInfo } = await APISERVICE.get(url, params);
        if( success){
            setInventaries(inventaries)
            setPageInfo(pageInfo);
        }
    }

  return (
    <div className='currentInventary'>
        <h3>Inventario Actual</h3>
        <CurrentInventaryTable inventaries={inventaries} pageInfo={pageInfo} getInventaries={getCurrentInventaries}/>
    </div>
  )
}

export default CurrentInventary