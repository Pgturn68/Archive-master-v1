import axios from 'axios'

export const login = (data) => {
    return axios.post('/api/user/login', data)
}

export const signUp = (data) => {
    return axios.post('/api/user/signup', data)
}

export const logout = () => {
    return axios.get()
}

export const getTrips = (userId) => {
    return axios.get(`/api/trip/${userId}`)
}

export const postTrips = (data) => {
    return axios.post('/api/trip', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
