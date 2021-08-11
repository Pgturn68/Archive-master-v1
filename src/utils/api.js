import axios from 'axios'

export const login = (data) => {
    return axios.post('/api/trips', data)
}

export const siggUp = (data) => {
    return axios.post('/api/trips', data)
}

export const logout = () => {
    return axios.get()
}

export const getTrips = () => {
    return axios.get()
}

export const postTrips = (data) => {
    return axios.post('/api/trips', data)
}
