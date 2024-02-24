import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componants/Header'
import '../Style/Pages/Root.css'


function Root() {
  return <>
  <Header />
  <main className="container">
    <Outlet />
  </main>
  </>
}

export default Root;
