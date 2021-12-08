import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `place-grid__delete ${isOwn ? '' : 'place-grid__delete_hidden'}`
    ); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `place-grid__like-btn ${isLiked ? 'place-grid__like-liked' : ''}`
    ); 

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

      return(
        <li className="place-grid__list-item">
            <img className="place-grid__item"  src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete} ></button>
            <div className="place-grid__title-container">
                <h2 className="place-grid__title">{props.card.name}</h2>
                <div className="place-grid__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="place-grid__like-count">{props.card.likes.length}</span>
                </div>
            </div>    
        </li>
      )
}

export default Card