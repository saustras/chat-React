import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from '../sidebar';
import backgroundImage from '../../assets/wallapaper.jpeg'
import { Link, useParams } from 'react-router-dom'
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import moment from 'moment'
import "./MessagePage.css"
import { uploadFile } from '../../api';
import { Loading } from '../Loading';
import { useSelector } from 'react-redux';
import { Avatar } from '../avatar';

export default function MessagePage() {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: "",
    username: "",
    profile_pic: "",
    online: false,
    _id: ""
  })
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef(null)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(preve => !preve)
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(preve => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url
      }
    })
  }
  const handleClearUploadImage = () => {
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: ""
      }
    })
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]

    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(preve => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url
      }
    })
  }
  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: ""
      }
    })
  }

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.emit('seen', params.userId)

      socketConnection.on('message-user', (data) => {
        setDataUser(data)
      })

      socketConnection.on('message', (data) => {
        setAllMessage(data)
      })


    }
  }, [socketConnection, params?.userId, user])

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setMessage(preve => {
      return {
        ...preve,
        text: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        })
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        })
      }
    }
  }


  return (
    <>
      <div className="container">
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="container-message">
          <header className="header">
            <div className="header-left">
              <Link to={"/"} className={`${isLargeScreen ?'hidden' : ''}`}>
                <FaAngleLeft size={25} />
              </Link>
              <div className="avatar-header">
                <Avatar
                  width={40}
                  height={40}
                  name={dataUser?.name}
                  imageUrl={dataUser?.profile_pic}
                  userId={dataUser?._id}
                />
              </div>
              <div>
                <h3 className="username">{dataUser?.name}</h3>
                <p className="status">
                  {dataUser.online ? <span className="status-online">online</span> : <span className="status-offline">offline</span>}
                </p>
              </div>
            </div>
          </header>


          <section className="message-section">
            <div className="messages-container" ref={currentMessage}>
              {allMessage.map((msg, index) => (
                <div key={index} className={`message-bubble ${user._id === msg?.msgByUserId ? "message-bubble-right" : "message-bubble-left"}`}>
                  <div className="message-content">
                    {msg?.imageUrl && <img src={msg?.imageUrl} alt="message" />}
                    {msg?.videoUrl && <video src={msg.videoUrl} controls />}
                  </div>
                  <p className="message-text">{msg.text}</p>
                  <p className="message-time">{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              ))}
            </div>


            {message.imageUrl && (
              <div className="upload-preview">
                <div className="upload-close-button" onClick={handleClearUploadImage}>
                  <IoClose size={30} />
                </div>
                <div className="upload-preview-image">
                  <img src={message.imageUrl} alt="upload" />
                </div>
              </div>
            )}


            {message.videoUrl && (
              <div className="upload-preview">
                <div className="upload-close-button" onClick={handleClearUploadVideo}>
                  <IoClose size={30} />
                </div>
                <div className="upload-preview-image">
                  <video src={message.videoUrl} controls muted autoPlay />
                </div>
              </div>
            )}

            {loading && (
              <div className="loading">
                <Loading />
              </div>
            )}
          </section>


          <section className="send-message-section">
            <div className="relative">
              <button onClick={handleUploadImageVideoOpen} className="send-button">
                <FaPlus size={20} />
              </button>

              {openImageVideoUpload && (
                <div className="upload-form">
                  <form>
                    <label htmlFor="uploadImage">
                      <div className="text-primary">
                        <FaImage size={18} />
                      </div>
                      <p>Image</p>
                    </label>
                    <label htmlFor="uploadVideo">
                      <div className="text-purple-500">
                        <FaVideo size={18} />
                      </div>
                      <p>Video</p>
                    </label>

                    <input
                      type="file"
                      id="uploadImage"
                      onChange={handleUploadImage}
                      className="hidden"
                    />

                    <input
                      type="file"
                      id="uploadVideo"
                      onChange={handleUploadVideo}
                      className="hidden"
                    />
                  </form>
                </div>
              )}
            </div>

            {/* Input box */}
            <form className="input-box" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type here message..."
                value={message.text}
                onChange={handleOnChange}
              />
              <button className='button-submit-message'>
                <IoMdSend size={28} />
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}