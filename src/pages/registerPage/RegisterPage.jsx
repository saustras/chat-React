import React, { useState } from 'react'
import { AuthLayout } from '../../layout/auth'
import { Link, useNavigate } from 'react-router-dom'
import './RegisterPage.css'
import { IoClose } from 'react-icons/io5'
import { Auth } from '../../api/auth'
import { toast } from 'react-toastify'
import { uploadFile } from '../../api'

const authCtrl = new Auth();

export default function RegisterPage() {

  const [uploadPhoto, setUploadPhoto] = useState()
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    profile_pic:""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await authCtrl.register(data);
      toast.success('Cuenta registrada correctamente.')
      navigate('/email')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    <>
      <AuthLayout>
        <div className="register-container">
          <div className="register-box">
            <h3 className="register-title">Crear cuenta</h3>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="field">

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  className="register-input"
                  onChange={handleOnChange}
                  required
                />
              </div>

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

              <div className="field">

                <label htmlFor="profile_pic">
                  <div className="register-upload">
                    <p>
                      {uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"}
                    </p>
                    {
                      uploadPhoto?.name && (
                        <button className='register-button-close-upload' onClick={handleClearUploadPhoto}>
                          <IoClose />
                        </button>
                      )
                    }

                  </div>
                </label>
                <input
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  className="register-input-upload"
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleUploadPhoto}
                />
              </div>

              <button className="button-submit" type="submit">
              <h3>Iniciar sesión</h3>
              </button>
            </form>

            <p className="register-link">
              Ya tienes cuenta? <Link to="/login">Ingresar</Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}
