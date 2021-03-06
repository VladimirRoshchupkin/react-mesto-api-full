export const BASE_URL = 'https://auth.nomoreparties.co' //'https://api.nomoreparties.co'; хммм на вебинаре был другой адрес))

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      //'Accept': 'application/json',//было в вебинаре
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}) //хм... а раньше мы указывали email: email
  })
};



export const authorize = (email, password) => {//хочется identifier как в вебинаре, но раз в примере почта, пусть будет почта
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      //'Accept': 'application/json',//было в вебинаре
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => res.json())
};
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
}


