import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
        
    } 

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    return(
        <PopupWithForm 
            name='edit' 
            title='Редактировать профиль' 
            buttonName='Сохранить' 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="form__input form__input_type_name" 
                id="your-name" 
                name="name" 
                placeholder="Имя" 
                required 
                minLength="2" 
                maxLength="40"
                value={name || ''}
                onChange={handleNameChange}/>
            <span 
                className="form__input-error" 
                id="your-name-error">
            </span>
            <input 
                type="text" 
                className="form__input form__input_type_job" 
                id="your-job" 
                name="about" 
                placeholder="Занятие" 
                required 
                minLength="2" 
                maxLength="200"
                value={description || ''}
                onChange={handleDescriptionChange}/>
            <span 
                className="form__input-error" 
                id="your-job-error">
            </span>  
        </PopupWithForm>
)}

export default EditProfilePopup;