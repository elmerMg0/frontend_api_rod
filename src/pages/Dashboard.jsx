import React from "react";
import Header from "../components/global/header/Header";
import ContentDashboard from "./ContentDashboard";
import '../styles/administracion/dashboard.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateDelivery } from "../redux/states/delivery";
import { APISERVICE } from "../services/api.services";
import { addCategories } from "../redux/states/category";
import Navigation from "../components/global/navigation/Navigation";
const Dashboard = () => {
  const dispatch = useDispatch()
  //Cada que se actualiza la pagina se cambia el estado de delivery
  useEffect(() => {
    dispatch(updateDelivery({state: false, quantity: 0}))
    getCategories()
  },[])

  const getCategories = async () => {
    const url = 'categoria/get-category-with-products'
    const { success, categories } = await APISERVICE.get(url);
    if(success){
      dispatch(addCategories(categories))
    }
  }

  return (
    <>
     <Header />
      <div className="dashboard">
        <ContentDashboard />
      </div>

    </>
  );
};

export default Dashboard;
