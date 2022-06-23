import React from "react";
//import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
class Main extends React.Component {
  constructor(props) {
    //нравится без деструктуризации, один минус - строка длиннее, но мне нравится видеть исходную привязку.
    super(props); 
    this.handleEditAvatarClick = props.onEditAvatar;
    this.handleEditProfileClick = props.onEditProfile;
    this.handleAddPlaceClick = props.onAddPlace;
  }

  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="content">
        <section className="profile">
          <div
            className="profile__avatar-cont"
            onClick={this.handleEditAvatarClick}
          >
            <img
              className="profile__avatar"
              src={this.context.avatar}
              alt="Фотография пользователя"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__user-name">{this.context.name}</h1>
            <button
              onClick={this.handleEditProfileClick}
              type="button"
              className="profile__btn-edit"
              aria-label="Редактировать"
            ></button>
            <p className="profile__user-description">
              {this.context.about}
            </p>
          </div>
          <button
            type="button"
            onClick={this.handleAddPlaceClick}
            className="profile__btn-add"
            aria-label="Добавить"
          ></button>
        </section>
        <section className="elements">
          {
          (this.props.cards || {}).map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={this.props.onCardClick}
                onCardLike={this.props.onCardLike}
                onCardDelete={this.props.onCardDelete}
              ></Card>
            );
          })}
        </section>
      </main>
    );
  }
}

export default Main;
