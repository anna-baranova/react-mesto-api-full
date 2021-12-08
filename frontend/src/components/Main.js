import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile">
                <img className="profile__image" src={currentUser.avatar} alt="Жак-Ив Кусто" onClick={props.onEditAvatar}/>
                <div className="profile__info">
                    <h1 className="profile__info-title">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__info-subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="place-grid">
                <ul className="place-grid__list">
                    {props.cards.map((card) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike} 
                    onCardDelete={props.onCardDelete}
                    />
                    )
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main
