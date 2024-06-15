import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";

import { useDispatch, useSelector } from 'react-redux';

import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from '../../redux/userSlice';
import { Avatar } from '../avatar';
import { SearchUser } from '../searchUser';
import "./Sidebar.css"

export const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', user._id)

            socketConnection.on('conversation', (data) => {

                const conversationUserData = data.map((conversationUser, index) => {
                    if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser?.sender
                        }
                    }
                    else if (conversationUser?.receiver?._id !== user?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.receiver
                        }
                    } else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                })

                setAllUser(conversationUserData)
            })
        }
    }, [socketConnection, user])


    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
        localStorage.clear()
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div>
                    <NavLink className={({ isActive }) => `nav-link ${isActive && "nav-link-active"}`} title="chat">
                        <IoChatbubbleEllipses size={20} />
                    </NavLink>

                    <div title="Agregar" onClick={() => setOpenSearchUser(true)} className="nav-link" >
                        <FaUserPlus size={20} />
                    </div>
                </div>

                <div>
                    <div className='avatar-side' title={user?.name} onClick={() => setEditUserOpen(true)}>
                        <Avatar
                            width={40}
                            height={40}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
                        />
                    </div>
                    <button title="logout" className="logout-button" onClick={handleLogout}>
                        <span>
                            <BiLogOut size={20} />
                        </span>
                    </button>
                </div>
            </div>

            <div className="content">
                <div className="content-header">
                    <h2>Mensajes</h2>
                </div>
                <div className="divider"></div>

                <div className="content-body">

                    {allUser.map((conv, index) => (
                        <NavLink to={"/" + conv?.userDetails?._id} key={conv?._id} className="conversation-link">
                            <div className="avatar-container">
                                <Avatar
                                    width={40}
                                    height={40}
                                    name={conv?.userDetails?.name}
                                    imageUrl={conv?.userDetails?.profile_pic}
                                    userId={conv?.userDetails?._id}
                                />
                            </div>
                            <div>
                                <h3>{conv?.userDetails?.name}</h3>
                                <div className="message-preview">
                                    <div>
                                        {conv?.lastMsg?.imageUrl && (
                                            <div>
                                                <span><FaImage /></span>
                                                {!conv?.lastMsg?.text && <span>Image</span>}
                                            </div>
                                        )}
                                        {conv?.lastMsg?.videoUrl && (
                                            <div>
                                                <span><FaVideo /></span>
                                                {!conv?.lastMsg?.text && <span>Video</span>}
                                            </div>
                                        )}
                                    </div>
                                    <p>{conv?.lastMsg?.text}</p>
                                </div>
                            </div>
                            {Boolean(conv?.unseenMsg) && (
                                <p className="unseen-msg">{conv?.unseenMsg}</p>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {openSearchUser && (
                <SearchUser onClose={() => setOpenSearchUser(false)} />
            )}
        </div>
    );
};