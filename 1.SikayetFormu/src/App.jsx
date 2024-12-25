import { useRef, useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Header from './components/Header';
import { useEffect } from 'react';
import RouterConfig from './config/RouterConfig'
import { useDispatch } from 'react-redux';
import Keycloak from 'keycloak-js';
import dbService from './services/DbService';

function App() {

  const dispatch = useDispatch()

  const getAllComplaint = async () => {
    try {
      const response = await dbService.complaintGet();
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
    url: "http://localhost:4000/",
    realm: "myrealm",
    clientId: "myclient",
  });

  // const client = new Keycloak({
  //   url: "http://localhost:4000/",
  //   realm: "myrealm",
  //   clientId: "confidential-client",
  // });

  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    client.init({ onLoad: "login-required" })
      .then((res) => {
        setLogin(res)
        setToken(client.token)

      })
      .catch((err) => {
        console.log("hata", err)
      })
  })
  console.log("isLogin:" + isLogin);
  console.log("token:" + token);

  return (
    <div>
      <Header />
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: '13px' }} />
    </div>
  )
}

export default App
