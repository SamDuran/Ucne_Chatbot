import React from 'react'
import iconbot from "../../assets/Vector.png"
import "./Loading.css"

const Loading = () => {
    return (
        <div>
            <div
                className='duration-300 transition-opacity'
                style={{ zIndex: "6000" }}
            >
                <div className='flex-col'>

                    <x-loaading className="w-24 h-24">

                        <div className="w-[20rem] h-2 mt-[12.50rem] bg-[#D9D9D9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1b1e65] animate-loading "></div>
                        </div>
                        <img
                            src={iconbot}
                            alt="Icono del bot"
                            className="absolute w-[6.3rem] top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{ zIndex: '10' }}
                        />
                        <div className='text-[#2E3191] text-[24px] text-center absolute top-[55%] left-1/2 transform -translate-x-1/2'>
                            UCNE CHATBOT
                        </div>

                        {/* <img
                            src={iconbot}
                            alt="Icono del bot"
                            className="absolute w-[6.3rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{ zIndex: '10' }}
                        />
                        <div className='text-blue-900 text-2xl text-center absolute top-[calc(100% + 1rem)] left-1/2 transform -translate-x-1/2'>
                            UCNE CHATBOT
                        </div>
                        <div className="w-[20rem] h-2 mt-[12.50rem] bg-[#D9D9D9] rounded-full overflow-hidden">
                            <div className="h-full   bg-[#1b1e65] animate-loading "></div>

                        </div> */}
                    </x-loaading>
                    <div className="mt-1 text-black font-mono text-[12px] sm:text-[12px] text-end">
                        Cargando...
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Loading