import React, { useState } from 'react'
import { AuthLayout } from '../../layout/auth'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { Auth } from '../../api/auth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice'

const authCtrl = new Auth();

export default function Login() {

  const [data, setData] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const response = await authCtrl.login(data);
      if (response.success) {
        dispatch(setUser(response?.data))
        localStorage.setItem('token',response?.data )
      }

      toast.success('Has iniciado sesion correctamente.')
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    <>
      <AuthLayout>
        <div className="register-container">
          <div className="register-box">
            <h3 className="register-title">Inicia sesión</h3>

            <form className="register-form" onSubmit={handleSubmit}>

              <div className="field">

                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Usuario"
                  className="register-input"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="field">

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  className="register-input"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button className="button-submit" type="submit">
                Iniciar sesión
              </button>
            </form>

            <p className="register-link">
              No tienes cuenta? <Link to="/register">Registrarse</Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}
