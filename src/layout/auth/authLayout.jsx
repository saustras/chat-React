import React from 'react'
import logo from '../../assets/logo.png'
import './authLayout.css';

export const AuthLayout = ({children}) => {
    return (
        <>
          <header className="auth-header">
            <img 
              src={logo} 
              alt="logo" 
              className="auth-logo"
            />
          </header>
          {children}
        </>
      );
    };
    
