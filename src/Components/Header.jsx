import React from 'react'
import AccountIcon from './AccountIcon'
import CompareButton from './CompareButton'
import brandLogo from '../assets/brand-logo.png'

const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            <span>  <img
            alt="logo"
            src={ brandLogo }
            width="20"
            height="20"
            className="d-inline-block align-top"
          />
             <b> Typing-Website</b>
            </span>
            <div>
              <CompareButton/>
            </div>
            
        </div>
        <div className="user-logo">
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header