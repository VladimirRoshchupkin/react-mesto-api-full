import React from "react";
class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //if (!this.props.card) return (null)    //плохой вариант, тогда плавного закрытия нет с текущими знаниями
    return (
      <div
        className={`popup popup_js_photo ${
          this.props.isOpen && "popup_visible"
        }`}
      >
        <figure className="popup__figure">
          <button
            type="button"
            className="popup__btn-close"
            onClick={this.props.onClose}
            aria-label="Закрыть"
          ></button>
          <img
            className="popup__img"
            src={this.props.card?.link}
            alt={this.props.card?.name}
          />
          <figcaption
            className="popup__figcap"
            alt={this.props.card?.name}
          >{this.props.card?.name}</figcaption>{/*потерялось, не заметил. на ГХ было раньше https://vladimirroshchupkin.github.io/mesto/*/}
        </figure>
      </div>
    );
  }
}

export default ImagePopup;
