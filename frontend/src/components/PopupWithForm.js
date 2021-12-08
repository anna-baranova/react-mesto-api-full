import React from 'react';

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? ('popup_visible') : ('')}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
                <form className={`form form_type_${props.name}`} name={`${props.name}-form`} onSubmit={props.onSubmit} autoComplete="off">
                    {props.children}
                    <button type="submit" className="form__save-btn">{props.buttonName}</button>
                </form>   
            </div>
        </div>
    )
}

export default PopupWithForm