import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.linkRef = React.createRef();
  }
  static contextType = CurrentUserContext;

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAddPlace({
      name: this.nameRef.current.value,
      link: this.linkRef.current.value,
    });
  };

  render() {
    return (
        <PopupWithForm
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
        form="js_element"
        title="Новое место"
        btnText="Создать"
      >
        <input
          id="photoName"
          name="popup_name"
          className="popup__input popup__input_js_name"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          ref={this.nameRef}
        />
        <span className="popup__error popup__error_js_photoName"></span>
        <input
          id="link"
          name="popup_link"
          className="popup__input popup__input_js_link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          ref={this.linkRef}
        />
        <span className="popup__error popup__error_js_link"></span>
      </PopupWithForm>
    );
  }
}

export default AddPlacePopup;
