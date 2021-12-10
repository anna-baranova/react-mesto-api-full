import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { authApiToken, authApi } from "../utils/Auth";

function App() {
  const history = new useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setiIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isRegistrationOk, setIsRegistrationOk] = React.useState(false)
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("");
  

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setiIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(item) {
    setIsImagePopupOpen(true)
    setSelectedCard(item)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setiIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsTooltipPopupOpen(false)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
      
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(e => console.log(e));
  } 

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
    })
      .catch(e => console.log(`Ошибка при удалении карточки: ${e}`));
  }

  function handleUpdateUser(data) {
    api.changeUserData(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
        .catch(e => console.log(`Ошибка при изменении данных пользователя: ${e}`))
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(e => console.log(`Ошибка при изменении аватара: ${e}`))
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(e => console.log(`Ошибка при создании карточки: ${e}`))
  }

  
  function handleRegisterUser(password, email) {
    setIsRegistrationOk(true);
    authApi(password, email, 'signup')
      .then((res) => {
        if (res.data) {
    //      setIsTooltipPopupOpen(true);
          history.push("/sign-in");
          setIsRegistrationOk(true);
        }
      })
      .catch((e) => {
        if (e.status === 400) {
          console.log(`Ошибка при регистрации пользователя: ${e}`);
        }
          setIsRegistrationOk(false);
  //        setIsTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsTooltipPopupOpen(true)
      });
  }

  function handleLoginUser(password, email) {
    setIsRegistrationOk(true);
    authApi(password, email, 'signin')
      .then((res) => {
        console.log("login", res)
        if (res.token) {
          console.log(res.token)
    //      setIsTooltipPopupOpen(true);
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/sign-in");
        }
      })
      .catch((e) => {
        if (e.status === 400) {
          console.log(`Ошибка при авторизации пользователя: ${e}`);
        }
        setIsRegistrationOk(false);
        setIsTooltipPopupOpen(true);
    });
  }

  function logOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  React.useEffect(() => {
    api.getFullData()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)    
        setCards(cardsData)
      })
      .catch(e => console.log(`Ошибка при получении дефолтных данных: ${e}`))
    }, [])


  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      authApiToken(localStorage.getItem("jwt"))
        .then((res) => {
          console.log(res)
          if (res) {
            setHeaderEmail(res.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch(e => console.log(`Ошибка при получении email пользователя: ${e}`));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
        <Header headerEmail={headerEmail} logOut={logOut} loggedIn={loggedIn}/>

        <Switch>
          <ProtectedRoute 
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register handleRegisterUser={handleRegisterUser}/>
          </Route>
          <Route path="/sign-in">
            <Login handleLoginUser={handleLoginUser}/>
          </Route>
          <Route exact path="*"> 
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />} 
          </Route>
        </Switch>
        {loggedIn && <Footer />}
      </div> 

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} 
      /> 

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      /> 

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup 
        onClose={closeAllPopups} 
        isOpen={isImagePopupOpen} 
        card={selectedCard}
      />

      <PopupWithForm 
        name='confirm-delete' 
        title='Вы уверены?' 
        buttonName='Да' 
        onClose={closeAllPopups} 
      />

      <InfoTooltip 
        isOpen={isTooltipPopupOpen} 
        onClose={closeAllPopups} 
        isRegistrationOk={isRegistrationOk}
      />
    </div>    
    </CurrentUserContext.Provider>
  );
}

export default App;
