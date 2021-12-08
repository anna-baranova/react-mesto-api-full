import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`popup popup_type_zoom-card ${props.isOpen ? ('popup_visible') : ('')}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <figure className="popup__zoom">
                <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                <figcaption className="popup__caption">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup