//пришлось переделать на функциональный компонент, т.к. никто не знает как задать в конструкторе стейтам значение по умолчанию из контекста.
//наставники-старшие студенты за 3-4 дня не смогли помочь, пока не ответили
//сам перепробовал кучу вариантов, просидел неделю и пришлось сдаться, т.к. не даёт тренажер перейти к 12-й работе пока эту не сдам.
/* class EditProfilePopup extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {//тут к пропсам и контент вписывал
    super(props);
    this.state = {
      userName: this.context?.cont, - вот здесь без проблем перадаются текстовые значения, но не передаются пропсы и контекст. componentDidUpdate componentDidMount и пр ничего не помогло.
      userDescription: this.context?.about, ..причем в структуре this местами контекст отображает, но при привязке всегда undefined, но тут без картинки не передать
    }; */

import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChange(event) {
    event.target.name === "userName" && setName(event.target.value);
    event.target.name === "userDescription" &&
      setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      //name: this.state.userName,
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      form="js_profile"
      title="Редактировать профиль"
      btnText="Сохранить"
    >
      <input
        id="name"
        name="userName"
        className="popup__input popup__input_js_name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={name || ""}
        //value={this.context.name}
      />
      <span className="popup__error popup__error_js_name"></span>
      <input
        id="about"
        name="userDescription"
        className="popup__input popup__input_js_about"
        type="text"
        placeholder="Призвание"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={description || ""}
      />
      <span className="popup__error popup__error_js_about"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
