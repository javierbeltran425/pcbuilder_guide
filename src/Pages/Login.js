// Paquetes u objetos de paquetes
import axios from 'axios'
import styled from 'styled-components'

// Componentes
import Spinner from '../Components/Spinner'

// Hooks
import { useState, useRef } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'

// Otros



// Hidden Div es un componente (puede recibir props)
const HiddenDiv = styled.div`
    transform: translateY(${
        ( { transform } ) => transform === 0 ? "0" : transform + "%"
    });
`

const Login = () => {
    const isLogged = localStorage.getItem('token') != null

    const history = useHistory()
    const username = useRef(null), password = useRef(null)
    const [ alertJS, setShowAlertJS ] = useState({ show: false, message: null })

    if(isLogged)
        history.push('/main')

    const { isLoading, mutate } = useMutation(login => {
        axios.post(process.env.REACT_APP_API_URL + 'login', login)
            .then(res => {
                console.log(res.data)

                if(res.status === 200)
                    saveAndNavigate(res.data.token)
            })
            .catch(({ response }) => {
                if(response.status === 404)
                    showAlertRoutine("Usuario no encontrado")
                else if(response.status === 401)
                    showAlertRoutine("Constraseña incorrecta")
                else
                    showAlertRoutine(response.data.message || "Algo salió mal")
            })
    })

    function handleClick(e) {
        e.preventDefault()

        var loginData = { username: username.current.value, password: password.current.value }
        
        if(loginData.username === "" || loginData.password === "")
            showAlertRoutine("Introduce datos primero")
        else
            mutate(loginData)
    }

    function showAlertRoutine(message){
        setShowAlertJS({ show:true, message: message })
        setTimeout(() => setShowAlertJS({ show: false, message: null }), 3000)
    }

    function saveAndNavigate(token) {
        localStorage.setItem('token', token)
        history.push('/main')
    }

    return(

        <>
            { isLoading ? <Spinner /> : null }
            <div className="w-full h-screen text-white font-bold bg-gradient-to-r from-blue-400 to-purple-600 flex justify-center items-center">
                <form action="/POST" className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <label className="mt-3 text-lg">Username</label>
                        <input ref={username} type="text" className="my-3 border rounded shadow-md text-gray-600 px-2 focus:border-purple-700 focus:ring-1 focus:ring-purple-700 outline-none"></input>
                    </div>
                    <div className="mt-5 flex flex-col justify-center items-center">
                        <label className="mt-3 text-lg">Password</label>
                        <input ref={password} type="password" className="my-3 border rounded shadow-md text-gray-600 px-2 focus:border-purple-700 focus:ring-1 focus:ring-purple-700 outline-none"></input>
                    </div>
                    <button onClick={handleClick} className="shadow-md w-60 p-1 my-4 bg-blue-400 hover:bg-blue-600 font-bold rounded">
                        Iniciar sesión
                    </button>
                    <p className="font-normal text-sm my-1 mt-3 text-center">
                        ¿No tienes cuenta?, <a className="font-bold text-blue-300" href="">registrate</a>
                    </p>
                </form>
                <HiddenDiv 
                    transform={ alertJS.show === true ? 0 : -500 }
                    className="absolute top-2 p-2 bg-gradient-to-r from-red-500 to-red-600 rounded shadow-md flex text-white
                    transition-all transition-500 ease-in-out items-center">
                        <span className="flex rounded-full bg-red-800 px-2 py-1 font-bold mr-3">!</span>
                        <span className="mr-2 text-left flex-auto"> { alertJS.message } </span>
                </HiddenDiv>
            </div>
        </>
    )
}

export default Login