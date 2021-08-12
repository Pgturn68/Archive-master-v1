import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';

export default function Logout() {
    let history = useHistory()
    useEffect(() => {
        localStorage.removeItem("userId")
        history.push('/')
    })
    return (
        <div>
            <h1>Logging Out</h1>
        </div>
    )
}
