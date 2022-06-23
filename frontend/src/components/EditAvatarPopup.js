import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.avatarRef = React.createRef();
  }
  static contextType = CurrentUserContext;

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onUpdateAvatar({
      avatar: this.avatarRef.current.value,
    });
  };

  render() {
    return (
      <PopupWithForm
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
        form="js_avatar-update"
        title="Обновить аватар"
        btnText="Сохранить"
        btnAddClassName="popup__btn-update"
      >
        <input
          id="link-update"
          name="popup_link-update"
          className="popup__input popup__input_js_link-update"
          type="url"
          placeholder="Ссылка на картинку"
          required
          ref={this.avatarRef}
        />
        <span className="popup__error popup__error_js_link-update"></span>
      </PopupWithForm>
    );
  }
}

export default EditAvatarPopup;
