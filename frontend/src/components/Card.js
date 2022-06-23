import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
class Card extends React.Component {
  //Намеренно делаю на классовых, т.к. это было плохо освещено в теории\практике и кажется на них никто не делает из студентов. к тому же Арр функциональный по умолчанию, наберусь опыта и там и там.
  constructor(props) {
    super(props);
  }

  static contextType = CurrentUserContext;

  onCardClick = () => {
    this.props.onCardClick(this.props.card);
  };

  onCardLike = () => {
    this.props.onCardLike(this.props.card);
  };

  onCardDelete = () => {
    this.props.onCardDelete(this.props.card);
  };

  render() {
    return (
      <article className="element">
        <img
          className="element__img"
          onClick={this.onCardClick}
          src={this.props.card.link}
          alt={this.props.card.name}
        />
        {this.props.card.owner._id === this.context._id && (
          <button
            type="button"
            className="element__btn-delete"
            aria-label="Удалить"
            onClick={this.onCardDelete}
          ></button>
        )}
        <div className="element__cont">
          <h2 className="element__title">{this.props.card.name}</h2>
          <div className="element__cont-like">
            <button
              type="button"
              className={`element__btn-heart ${
                this.props.card.likes.some((i) => i._id === this.context._id) &&
                "element__btn-heart_active"
              }`}
              aria-label="Сердечко"
              onClick={this.onCardLike}
            ></button>
            <span type="button" className="element__like-count">
              {this.props.card.likes.length}
            </span>
          </div>
        </div>
      </article>
    );
  }
}

export default Card;
