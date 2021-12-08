import React from 'react';
import authOkPath from "./../images/auth_ok.svg"
import authErrPath from "./../images/auth_err.svg"

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_info ${props.isOpen ? ('popup_visible') : ('')}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container popup-info__container">
        {props.isRegistrationOk ? (
          <img className="popup-info__image" src={authOkPath} alt="все ок" />
        ) : (
          <img className="popup-info__image" src={authErrPath} alt="что-то пошло не так" />
        )}
        <h2 className="popup-info__title">
          {props.isRegistrationOk ? (
            'Вы успешно зарегистрировались!'
          ) : (
            'Что-то пошло не так! Попробуйте ещё раз.'
          )}
        </h2>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button> 
      </div>
    </div> 
  )
}

export default InfoTooltip; 