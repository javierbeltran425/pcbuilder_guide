import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Spinner = () => {
    return (
        <div className="absolute top-0 mx-auto h-screen w-screen flex justify-center items-center bg-black opacity-25 z-10">
            <Icon icon={faCircleNotch} className="fill-current text-white text-3xl animate-spin"/>
        </div>
    )
}

export default Spinner;