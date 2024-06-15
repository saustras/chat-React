import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import {Loading} from '../Loading';
import {UserSearchCard} from '../userSearchCard';
import toast from 'react-hot-toast'
import "./searchUser.css"

import { IoClose } from "react-icons/io5";
import { User } from '../../api';

const userCtrl = new User();


export const SearchUser = ({onClose}) => {
    const [searchUser,setSearchUser] = useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("")


    const handleSearchUser = async()=>{
        
        try {
          console.log("esta entrando")
            const response = await userCtrl.getAllUser(search)
            setLoading(false)

            setSearchUser(response)

        } catch (error) {
            toast.error(error?.response?.message)
        }
    }

    useEffect(()=>{
        handleSearchUser()
    },[search])
    return (
        <div className="modal-container">
          <div className="modal-content">

            <div className="close-button" onClick={onClose}>
              <IoClose />
            </div>
      
            <div className="search-bar">
              <input 
                type="text"
                placeholder="Busqueda por nombre y usuario"
                className="search-input"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <div className="search-icon">
                <IoSearchOutline size={25} />
              </div>
            </div>
      
            <div className="search-results">
              {searchUser.length === 0 && !loading && (
                <p className="no-results-text">No user found!</p>
              )}
      
              {loading && (
                <p><Loading /></p>
              )}
      
              {searchUser.length !== 0 && !loading && (
                searchUser.map((user, index) => (
                  <UserSearchCard key={user._id} user={user} onClose={onClose} />
                ))
              )}
            </div>
          </div>
        </div>
      );
}

