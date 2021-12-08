import React from 'react';
import logoPath from './../images/header__logo.svg';
import { Link, useLocation } from 'react-router-dom'


function Header (props) {
  const location = useLocation();
  const [headerMenuOpened, setHeaderMenuOpened] = React.useState(false)

  const toggleHeaderMenu = () => {
    if (headerMenuOpened) {
      setHeaderMenuOpened(false);
    } else {  
      setHeaderMenuOpened(true);
    }
  }; 

  return(
    <header className="header">
      {props.loggedIn && headerMenuOpened && (
        <div className={`header__menu ${headerMenuOpened && 'header__menu_visible'}`}>
          <p className="header__email">{props.headerEmail}</p>
          <span className="header__logout-link" onClick={props.logOut}>Выйти</span>
        </div>
      )}
      <div className="header__main">
        <img className="header__logo" src={logoPath} alt='логотип' />
        {props.loggedIn ? (
          <>
            <div className="header__wrapper">
              <p className="header__email">{props.headerEmail}</p>
              <span className="header__logout-link" onClick={props.logOut}>Выйти</span>
            </div>
            <button type='button' className="header__menu-btn" onClick={toggleHeaderMenu} />
          </>
          ) : (location.pathname === "/sign-in" ? (
            <Link className="header__auth-link" to="/sign-up">Регистрация</Link>
          ) : (
            <Link className="header__auth-link" to="/sign-in">Войти</Link>
        ))}
      </div>
      
    </header>
  )
}

export default Header