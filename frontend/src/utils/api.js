class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
        // this._token = token;
    }

    getFullData() {
        return Promise.all([this.getUserData(), this.getCards()])
    }

    getUserData() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: {
                // authorization: this._token,
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    }    

    getCards() {
        return fetch (`${this._baseUrl}/cards`, {
            headers: {
                // authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    };

    changeUserData(data) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                // authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => this._getResponseData(res))
    }

    changeAvatar(data) {
        return fetch (`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                // authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => this._getResponseData(res))
    }

    createCard(data) {
        return fetch (`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                // authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => this._getResponseData(res))
    }

    removeCard(id) {
        return fetch (`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                // authorization: this._token,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked)
        {return fetch (`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                // authorization: this._token
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    } else {
        return fetch (`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                // authorization: this._token
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
        }
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`${res.status}`); 
        }
        return res.json();
      }
    
}

const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    baseUrl: 'https://back.mestoproject.nomoredomains.rocks'
    // token: 'c7246450-eb40-44a5-8abb-048e9d2f61cc'
    // token:`Bearer ${localStorage.getItem("jwt")}`
  })

export default api;

