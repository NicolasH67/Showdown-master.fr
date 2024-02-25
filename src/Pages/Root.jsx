import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componants/Header'
import Footer from '../Componants/Footer'
import '../Style/Pages/Root.css'


function Root() {
  return <>
  <Header />
  <main className="container">
    <Outlet />
  </main>
  <Footer />
  </>
}

export default Root;
