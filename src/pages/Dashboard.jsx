import React from "react";
import Header from "../components/global/header/Header";
import Navegation from "../components/global/navigation/Navegation";
import ContentDashboard from "./ContentDashboard";
import '../styles/administracion/dashboard.css'
const Dashboard = () => {
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
