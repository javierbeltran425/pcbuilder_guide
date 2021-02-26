const Card = ({ img, title, price, desc }) => {
    return(
        <div className="my-3 mx-2 py-2 bg-white shadow-md rounded flex justify-between text-gray-600 items-start 
        w-10/12 md:w-4/12 lg:w-1/5"> 
            <img src={img} alt="" className="w-4/12 pl-5 pt-3" />
            <div className="w-8/12 flex flex-col text-right justify-end px-3 pt-3 items-end">
                <h3 className="font-bold">{title}</h3>
                <div className="text-xs mt-2">
                    <p>${price}</p>
                    <p>{desc}</p>
                </div>
                <button className="bg-blue-400 p-1 mt-2 rounded-full px-6 text-sm font-bold text-white shadow">Más</button>
            </div>
        </div>
    )
}

export default Card