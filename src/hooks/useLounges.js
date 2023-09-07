import { useEffect, useRef, useState } from "react";
import { APISERVICE } from "../services/api.services";

export function useLounges (){
    const [lounges, setLounges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([])
    const [loungeInfo, setLoungeInfo] = useState({})
    const loungeFlag = useRef();

    const getLounges = async () => {
        const url = "salon/get-lounges";
        const { success, lounges } = await APISERVICE.get(url);
        if (success) {
          setLounges(lounges);
          if(lounges.length > 0) getTables(lounges[0].id);
        } 
      };
      const getTables = async (idLounge=loungeFlag.current) => {
        try {
          loungeFlag.current = idLounge;
          setLoading(true);
          const url = "mesa/get-tables/?";
          const params = `idLounge=${idLounge}`;
          const { success, tables, lounge} = await APISERVICE.get(url, params);
          if (success) {
            setLoungeInfo(lounge);
            setTables(tables);
          }
        } catch (error) {
          console.error('Error');
        }finally{
          setLoading(false);
        }
      
      };

    useEffect(() => {
        getLounges();
    },[])
    return { loungeFlag, tables, loungeInfo, lounges, getTables, loading};
}