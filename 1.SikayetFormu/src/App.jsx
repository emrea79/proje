import { useRef, useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Header from './components/Header';
import { useEffect } from 'react';
import RouterConfig from './config/RouterConfig'
import { useDispatch } from 'react-redux';
import Keycloak from 'keycloak-js';

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
    getAllComplaint();
  }, [])

  const client = new Keycloak({
    url: "http://127.0.0.1:4000/",
    realm: "myrealm",
    clientId: "myclient",
  });

  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  if (isRun.current) return;

  isRun.current = true;

  client.init({ onLoad: "login-required" })
    .then((res) => {
      setLogin(true)

    })
    .catch((err) => {
      console.log("hata", err)
    })



  return (
    <div>
      <Header />
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: '13px' }} />
    </div>
  )
}

export default App
