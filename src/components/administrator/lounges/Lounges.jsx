import React, { useState } from "react";
import "./lounges.css";
import LoungesList from "./LoungesList";
import TableGrilla from "./TableGrilla";
import PosWithTables from "../pointOfSaleWithTables/PosWithTables";
import { OrderDetailProvider } from "../../../context/orderDetail";
import ModalBeginPeriod from "./ModalBeginPeriod";
import { useLounges } from "../../../hooks/useLounges";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Lounges = () => {
  const [showPos, setShowPos] = useState(false);
  const [showModalPeriod, setShowModalPeriod] = useState(false);
  const { loungeFlag, lounges, getTables, loungeInfo, tables, loading} = useLounges();
  const user = useSelector(store => store.user);
  const loungeSelected = (lounge) => {
    if(loading)return;
    getTables(lounge.id);
  }
  useEffect(() => {
    if (!user.periodUser.state) {
      setShowModalPeriod(true);
      return;
    }
  },[])

  return (
    <OrderDetailProvider>
      {showPos ? (
          <PosWithTables
          setShowPos={setShowPos}
          getTables={getTables}
          />
      
      ) : (
        <div className="lounges">
          <LoungesList
            lounges={lounges}
            loungeSelected={loungeSelected}
            loungeFlag={loungeFlag.current}
            loading={loading}
          />
          <TableGrilla
            loading={loading}
            tables={tables}
            loungeInfo={loungeInfo}
            setShowPos={setShowPos}
          />
        </div>
      )}
        <ModalBeginPeriod show={showModalPeriod} />

    </OrderDetailProvider>
  );
};

export default Lounges;
