import React from "react";
class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.title = props.title;
    this.onSubmit=props.onSubmit
  }

  render() {
    return (
      <div
        className={`popup popup_${this.name} ${
          this.props.isOpen && "popup_visible"
        }`}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__btn-close"
            onClick={this.props.onClose}
            aria-label="Закрыть"
          ></button>
          <h2 className="popup__title">{this.title}</h2>
          <form
            className="popup__form popup__form_type_add-card-js"
            name="popup_form-element"
            onSubmit={this.props.onSubmit}
          >
            {this.props.children}
            <button
              type="submit"
              className={`popup__btn-save ${
                this.props.btnAddClassName && this.props.btnAddClassName
              }`}
            >
              {this.props.btnText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default PopupWithForm;
