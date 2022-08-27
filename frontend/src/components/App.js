import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../App.css";

import { Route, Redirect, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [regState, setRegState] = useState(false);
  //

  const navigate = useNavigate();
    useEffect(() => {
    tokenCheck();
  }, []);
  useEffect(() => {
    if (loggedIn) {
      navigate("/")//в каком порядке выполнять переадресацию и запрос карточек - вопрос спорный.....оставил пока так.
      api//подгружает только медленно. но и интернет так себе на деервне мобильный.
      .getProfile()
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
    const refreshCards = () => {
      return api
        .getInitialCards()
        .then((serverCardList) => {
          setCards(serverCardList);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    refreshCards();
      return;
    }   
  }, [loggedIn]); 

  const handleLogin = (email, password) => {
    auth.authorize(email, password).
    then((data) => {
      if (!data.token) {
        setRegState(false);
        setIsTooltipPopupOpen(true); // хотя указано что это окно о успешной или не очень регистрации, но для неудачной авторизации оно тоже подходит. надо же как-то проинформировать.
        return;
      }
      localStorage.setItem("jwt", data.token); 
      setLoggedIn(true);
    })
    .catch((res) => {
      console.log('fail login ', res); 
    });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res.ok) {
          setRegState(true);
          setIsTooltipPopupOpen(true);
          navigate("/sign-in")
          return;
        }
        setRegState(false);
        setIsTooltipPopupOpen(true);
      })
      .catch((res) => {
        console.log('fail register ', res); 
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {//localStorage.getItem("jwt")
      //const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setUserData({...userData,
            email: res.data.email,
          });
          setLoggedIn(true);
        }
      })
      .catch((res) => {
        console.log('fail token check ', res, jwt); 
      });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

/*   useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
    const refreshCards = () => {
      return api
        .getInitialCards()
        .then((serverCardList) => {
          setCards(serverCardList);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    refreshCards();
  }, []); */

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike({ isLiked: isLiked, id: card._id })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(item) {
    api
      .editProfile(item)
      .then((item) => {
        setСurrentUser(item);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(item) {
    api
      .editAvatar(item)
      .then((item) => {
        setСurrentUser(item);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(item) {
    api
      .addCard(item)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipPopupOpen(false);
    selectedCard &&
      setTimeout(() => {
        setSelectedCard(null);
      }, 10 * 1000);//это чтобы вначале плавно пропало окно в течении 1.5 сек а через 10сек удалилась ссылка на картинку. хочу именно 10сек.
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userData={userData}
          signOut={handleSignOut}
        />
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute loggedIn={loggedIn} path="/">
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                ></Main>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
        </Routes>

        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <PopupWithForm
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          form="js_delete"
          title="Вы уверены?"
          btnText="Да"
          btnAddClassName="popup__btn-delete"
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        ></ImagePopup>

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          regState={regState}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;