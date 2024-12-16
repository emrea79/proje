import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Header from './components/Header';
import DetailPage from './pages/DetailPage';
import { useEffect } from 'react';
import RouterConfig from './config/RouterConfig'

function App() {
  const getAllComplaint = async () => {
    try {
      const response = await DbService.complaintGet();
      if (response) {
        dispatch(setComplaints(response))
        console.log(response)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllComplaint();
  }, [])

  return (
    <div>
      <Header />
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: '13px' }} />
    </div>
  )
}

export default App
