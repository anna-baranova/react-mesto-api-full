import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    function handlePlaceChange(e) {
        setPlace(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: place,
            link,
        });
        setPlace('');
        setLink('');
    }

    return (
        <PopupWithForm 
            name='add-card' 
            title='Новое место' 
            buttonName='Создать' 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                className="form__input form__input_type_place" 
                id="travel-place" 
                name="place" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30"
                value={place || ''}
                onChange={handlePlaceChange}
            />
            <span 
                className="form__input-error" 
                id="travel-place-error">
            </span>
            <input 
                type="url" 
                className="form__input form__input_type_link" 
                id="place-url" 
                name="link" 
                placeholder="Ссылка на картинку" 
                required
                value={link || ''}
                onChange={handleLinkChange}
            />
            <span 
                className="form__input-error" 
                id="place-url-error">
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;