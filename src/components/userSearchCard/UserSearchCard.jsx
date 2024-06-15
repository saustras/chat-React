import React from 'react'

import { Link } from 'react-router-dom'
import "./UserSearchCard.css"


export const UserSearchCard = ({user, onClose}) => {
  return (
<Link to={"/" + user?._id} onClick={onClose} className="custom-link">
    <div className="user-info">
        <div className="user-avatar">
            <img
                width="50"
                height="50"
                name={user?.name}
                src={user?.profile_pic}
            />
        </div>
        <div className="user-details">
            <div className="user-name">
                {user?.name}
            </div>
            <p className="user-email">{user?.email}</p>
        </div>
    </div>
</Link>
  )
}

