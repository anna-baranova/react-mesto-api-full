import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      } 

    return (
        <PopupWithForm 
            name='avatar' 
            title='Обновить аватар' 
            buttonName='Сохранить' 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                type="url" 
                className="form__input form__input_type_avatar" 
                id="avatar-url" 
                name="avatar" 
                placeholder="Ссылка на аватарку" 
                required
                ref={avatarRef}
            />
            <span 
                className="form__input-error" 
                id="avatar-url-error">   
            </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup