export class Api {
  constructor({ baseUrl }) { // , headers
    //this._headers = headers;
    this._baseUrl = baseUrl;
  }

  get _headers() {
    //console.log('_headers', localStorage.getItem("jwt"))
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editProfile(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  toggleLike(item) {
    const typeRequest = item.isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${item.id}/likes`, {
      method: typeRequest,
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api({
  baseUrl: "https://api.adps.students.nomoredomains.sbs",
  
  //baseUrl: "https://mesto.nomoreparties.co/v1/cohort-37",
  //headers: {
  //  authorization: "2ac160e3-289e-41a6-a18f-46d80731db29",
  // "Content-Type": "application/json",
  //},
});
