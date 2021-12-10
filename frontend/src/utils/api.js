class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getFullData() {
        return Promise.all([this.getUserData(), this.getCards()])
    }

    getUserData() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: {authorization: this._token},
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    }    

    getCards() {
        return fetch (`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    };

    changeUserData(data) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
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
                authorization: this._token,
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
                authorization: this._token,
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
                authorization: this._token
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked)
        {return fetch (`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            },
            credentials: 'include',
        })
        .then(res => this._getResponseData(res))
    } else {
        return fetch (`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
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
    baseUrl: 'https://back.mestoproject.nomoredomains.rocks',
    token:`Bearer ${localStorage.getItem("jwt")}`
  })

export default api;

