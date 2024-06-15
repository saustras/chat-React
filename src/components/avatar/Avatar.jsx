import React from 'react';
import { useSelector } from 'react-redux';
import { PiUserCircle } from 'react-icons/pi';
import './Avatar.css';

export const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser);

  let avatarName = "";
  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ];

  const randomNumber = Math.floor(Math.random() * 9);
  const isOnline = onlineUser.includes(userId);

  return (
    <div className="avatar" style={{ width: `${width}px`, height: `${height}px` }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
        />
      ) : (
        name ? (
          <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={`avatar-initials ${bgColor[randomNumber]}`}
          >
            {avatarName}
          </div>
        ) : (
          <PiUserCircle
            size={width}
          />
        )
      )}

      {isOnline && (
        <div className="online-indicator"></div>
      )}
    </div>
  );
}

