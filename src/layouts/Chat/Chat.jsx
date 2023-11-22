import React, { useState } from 'react'
import iconbot from "../../assets/Vector.png"
import user from "../../assets/user.png"

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hola estudiante, ¿necesitas información sobre el reglamento académico? Pregunta lo que desees.', sender: 'bot' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const newMsg = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'user',
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <>
            <nav class="border-2 border-gray-200 mb-10">
                <div class="w-full mx-auto">
                    <div class="mx-2 flex flex-wrap items-center justify-between">
                        <a href="#" class="flex mt-4 mx-8 mb-4">
                            <img
                                src={iconbot}
                                className='h-10 mr-3'
                            />
                            <span class="text-[#2E3191] text-[24px] self-center text-lg font-semibold whitespace-nowrap">UCNE CHATBOT</span>
                        </a>
                        <div class="flex md:hidden md:order-2">
                            <button data-collapse-toggle="mobile-menu-3" type="button"
                                class="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                                aria-controls="mobile-menu-3" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="hidden md:flex justify-between items-end w-full md:w-auto md:order-1 mx-8" id="mobile-menu-3">
                            <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                                <li>

                                    <a href="#"
                                        class="middle none center rounded-lg bg-blue-950 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                                        aria-current="page">Descubre más</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Chat */}
            {/* <div >
                <div className="w-[50rem] mx-auto my-8">
                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-200 p-4">

                            {messages.map((message) => (
                                <div className='relative'>
                                    <img src={iconbot} className="h-5 w-5 mr-2 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <div
                                        key={message.id}
                                        className={`w-full border border-gray-200 outline-none py-2 px-8  my-2 p-2 rounded-lg ${message.id % 2 === 0 ? 'bg-gray-300 text-left' : 'bg-gray-100 text-left'
                                            }`}
                                    >


                                        {message.text}
                                    </div>
                                </div>


                            ))}
                        </div>
                        <div className="bg-gray-200 p-4 flex flex-row">
                            <input
                                type="text"
                                className="w-full border rounded-lg px-2 py-1"
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg"
                                onClick={sendMessage}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

<div >
                <div className="w-[50rem] mx-auto my-8">
                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-200 p-4">
                            {messages.map((message) => (
                                <div className='relative'>
                                    <img
                                        src={message.sender === 'user' ? user : iconbot}
                                        className="h-5 w-5 mr-2 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                    <div
                                        key={message.id}
                                        className={`w-full border border-gray-200 outline-none py-2 px-8  my-2 p-2 rounded-lg ${message.sender === 'user' ? 'bg-gray-300 text-left' : 'bg-gray-100 text-left'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-200 p-4 flex flex-row">
                            <input
                                type="text"
                                className="w-full border rounded-lg px-2 py-1"
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg"
                                onClick={sendMessage}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Chat