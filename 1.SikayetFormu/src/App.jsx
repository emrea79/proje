import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Header from './components/Header';
import DetailPage from './pages/DetailPage';
import { useEffect } from 'react';
import RouterConfig from './config/RouterConfig'
import { setCurrentUser } from './redux/slices/UserSlices';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()

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
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    dispatch(setCurrentUser(currentUser));
  })

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
