import React from 'react'
import flecha from "../../assets/Arrow.svg"

let ChatbotInfo1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
let ChatbotInfo2 = "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages."
let Equipo = [
    { nombre: "Samuel Duran", cargo: "Gestor del proyecto" },
    { nombre: "Yunilda", cargo: "Documentación" },
    { nombre: "Elianny", cargo: "Documentación" },
    { nombre: "Pedro", cargo: "Analista" },
    { nombre: "Jeremy", cargo: "Analista" },
    { nombre: "Pablo Burgos", cargo: "Diseñador" },
    { nombre: "Jeison", cargo: "Diseñador" },
    { nombre: "Rafael", cargo: "Diseñador" },
    { nombre: "Prandi", cargo: "Desarrollador" },
    { nombre: "Anderson Gomez", cargo: "Desarrollador" },
    { nombre: "Daniel", cargo: "Desarrollador" },
    { nombre: "Jose Alberto", cargo: "Desarrollador" },
    { nombre: "Sander", cargo: "Tester" },
]

let participant = "/src/assets/participants/"


const Team = () => {
    
    return (
        <div className='flex h-full w-full relative flex-col bg-white'>
            <div className='row-start-2 row-span-3 shadow-md flex h-full w-full relative bg-white'>
                <a className='bg-[#2e3191] hover:bg-[#3D40BE] py-2 px-4 rounded-full m-2 relative' href='/Chat'>
                    <img
                        src={flecha}
                        alt="Transparent"
                        className='w-4 h-6'
                    />
                </a>
                <div className='flex w-full items-center justify-center'>
                    <p className='me-5 font-bold text-2xl'>Descubre más</p>
                </div>
            </div>
            <div className='flex w-full items-center justify-center'>
                <div className='flex flex-col w-full items-center justify-center'>
                    <p className='font-black text-xl mt-5'>¿Qué es UCNE CHATBOT?</p>
                    <p className='text-lg' style={{width : "52rem"}}>{ChatbotInfo1}</p>
                    <p className='mt-5 text-lg' style={{width : "52rem"}}>{ChatbotInfo2}</p>
                    <p className='mt-6 font-black text-xl'>Nuestro Equipo</p>
                    <div className='flex flex-row flex-wrap' style={{width : "52rem"}}>
                    {
                        Equipo.map((item) => (
                            <div className='flex flex-col mt-9 mx-4'>
                                <div className='flex rounded-xl bg-[#d9d9d9] w-32 h-32 items-center justify-center'>
                                    <img
                                        src={participant + "" + item.nombre + ".png"}
                                        alt="Transparent"
                                        className='w-full h-full rounded-xl'
                                    />
                                </div>
                                <p className='font-bold text-lg'>{item.nombre}</p>
                                <p className='text-sm'>{item.cargo}</p>
                                <p className='font-bold text-xs text-[#38a0ff]'>in</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team