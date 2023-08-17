import React from "react";
import Header from "../components/global/header/Header";
import Navegation from "../components/global/navigation/Navegation";
import ContentDashboard from "./ContentDashboard";
import '../styles/administracion/dashboard.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateDelivery } from "../redux/states/delivery";
const Dashboard = () => {
  const dispatch = useDispatch()
  //Cada que se actualiza la pagina se cambia el estado de delivery
  useEffect(() => {
    dispatch(updateDelivery({state: false, quantity: 0}))
  },[])
  return (
    <>
      <Header />
      <div className="dashboard">
        <Navegation />
        <ContentDashboard />
      </div>

    </>
  );
};

export default Dashboard;
