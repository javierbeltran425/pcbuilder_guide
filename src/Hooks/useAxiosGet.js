import axios from 'axios'

import { useEffect, useState } from 'react'

// Los Hooks siempre inician con use
export function useAxiosGet(url) {
    // Un Hook personalizado debe ser una función que haga referencia a Hooks de react
    const [ request, setRequest ] = useState({ status: 'loading', error: false, response: null })

    // Ciclo de vida
    // Realizarla, esperar y obtener datos
    
    // useEffect espera Callback de función a reaizar y arreglo de dependencias
    
    // Cosas de ejecución del useEffect: 
    // ComponentWillMount
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setRequest({ status: 'done', error: false, response: res.data })
            })
            .catch(err => {
                setRequest({ status: 'done', error: true, response: null })
            })
    }, [url])

    return request
    // ComponentDidMount

    // ComponentWillUnmount

    // ComponentWillUpdate
    
    // ComponentDidUpdate

}