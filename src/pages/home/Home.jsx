
import React, { useEffect, useState } from 'react'
import { User } from '../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../../redux/userSlice';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Sidebar} from '../../components/sidebar';
import "./Home.css"
import { ENV } from "../../utils/constants";
import { io } from 'socket.io-client'



const userCtrl = new User();

export default function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [socketInitialized, setSocketInitialized] = useState(false);
  const [socketConnection, setSocketConnectionState] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  let user
  useEffect(() => {
    (async () => {
         user = await userCtrl.getUser();
         if (!user) {
          navigate("/login")
           dispatch(logout())
         }
        dispatch(setUser(user))
        
    })();
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const setSocket = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      try {
        const socket = await io("https://chat-node-back-w4ll.onrender.com", {
          path: '/user',
          "transports": ['websocket'],
          auth: {
            token: token,
            secure: true,
          },
        });

        console.log(socket)
        socket.on('onlineUser', (data) => {
          dispatch(setOnlineUser(data));
        });

        socket.on('connect', () => {
          if (socket.connected) {
            dispatch(setSocketConnection(socket))
          }
          
        });
        setSocketInitialized(true); 
      } catch (error) {
        console.error('Error al establecer la conexión del socket:', error);
      }
    };

    if (!socketInitialized) {
      setSocket();
    }

    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
        setSocketConnectionState(null);
      }
    };
  }, [dispatch, socketConnection, socketInitialized]);


  const users = useSelector(state => state.user)
    const basePath = location.pathname === '/'
return (
  <div className={`container ${!basePath && 'container-lg'}`}>
  <section className={`section-sidebar ${!basePath && !isLargeScreen ?'hidden' : ''}`}>
    <Sidebar />
  </section>

  <section className={`section-message ${basePath && 'hidden'}`}>
    <Outlet />
  </section>

</div>
  );
  }