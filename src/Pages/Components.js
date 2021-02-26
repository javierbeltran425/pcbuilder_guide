// Petición a la API -> Tipo de componente

// useEffect -> Controlar las acciones del ciclo de vida de un componente
// useAxiosGet -> Custom Hook, hacer petición get a la API

import Card from '../Components/Card'
import Navbar from '../Components/Navbar'
import Spinner from '../Components/Spinner'

import ram from '../Resources/Svg/ram.svg'
import cpu from '../Resources/Svg/cpu.svg'
import cooler from '../Resources/Svg/fan.svg'
import casePc from '../Resources/Svg/case.svg'
import gpu from '../Resources/Svg/video-card.svg'
import psu from '../Resources/Svg/power-supply.svg'
import mobo from '../Resources/Svg/motherboard.svg'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAxiosGet } from '../Hooks/useAxiosGet'

const pcComp =[
    'Case',
    'Cooler',
    'Cpu',
    'Gpu',
    'Mobo',
    'Psu',
    'Ram'
]

function getComponentImg(component) {
    switch(component) {
        case 'Mobo':
            return mobo
        case 'Ram':
            return ram
        case 'Case':
            return casePc
        case 'Cooler':
            return cooler
        case 'Gpu':
            return gpu
        case 'Cpu':
            return cpu
        case 'Psu':
            return psu
        default:
            return null
    }
}

const Components = () => {
    const [ comp, setComp ] = useState({ comp: 'case', status: 'done' })
    const history = useHistory()
    const isLogged = localStorage.getItem('token') != null

    
    if(!isLogged)
    history.push('/')
    
    let petition = useAxiosGet(process.env.REACT_APP_API_URL + comp.comp)
    let content = null
    
    if(comp.status === 'loading')
        content = <Spinner />
    
    if(petition.error){
        alert('F')
    }

    if(petition.response != null){
        content = petition.response.obj.objects.map(e => 
            <Card title={`${e.name} ${e.frequency}`} price={e.price} desc={`${e.type} ${e.manufacturer}`} img={getComponentImg(e._component)} />
        )
    }
    return(
        <>
            <Navbar />
                <div className="w-full h-44 flex justify-center items center font-bold text-5xl text-gray-600 p-5">
                    Componentes disponibles
                </div>
                <div className="w-full bg-gray-300 px-2 py-3 flex justify-start items-center overflow-x-auto lg:justify-around">
                    { pcComp.map((val, index) => 
                    <button className="rounded-full bg-white px-4 py-1 mx-2 font-bold shadow-md outline-none ring-0 
                    md:mx-8 hover:animate-wiggle" 
                    onClick={() => setComp({ comp: val.toLowerCase(), status: 'loading' })}
                    >
                        { val }
                    </button> ) 
                }
                </div>
                <div className="flex justify-center flex-wrap">
                {content}
            </div>
        </>
    )
}

export default Components