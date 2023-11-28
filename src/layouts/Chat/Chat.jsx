import React, { useState, useEffect, useRef } from "react";
import iconbot from "../../assets/Vector.png";
import user from "../../assets/user.png";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { RiChatNewLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import CopyToClipboard from "react-copy-to-clipboard";
import ReactLoading from "react-loading";
import { ChatService } from "../../services/ChatServices";
import "./Chat.css";

const Chat = () => {
  const [texto, setTexto] = useState("Texto a copiar");
  const [copiado, setCopiado] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola estudiante, ¿necesitas información sobre el reglamento académico? Pregunta lo que desees.",
      sender: "bot",
    },
  ]);
  const ramdonMsgBot = [
    "Hola estudiante, ¿necesitas información sobre el reglamento académico? Pregunta lo que desees.",
    "Hola!, sobre que quieres hablar del reglamento académico?",
    "Hola, soy tu asistente para lo que necesites saber sobre el reglamento académico",
  ];

  const [newMessage, setNewMessage] = useState("");
  //   useEffect(() => {
  //       console.log("hola")
  //   }, [newMessage.length>40])
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Desplazar automáticamente hacia abajo cuando se agrega un nuevo mensaje
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Opcional: hace que el desplazamiento sea suave
    });
  }, [messages]);

  const makeMessage = (message, role) => {
    if (message.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        text: message,
        sender: role,
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage("");
    }
  };

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * ramdonMsgBot.length);
    return ramdonMsgBot[randomIndex];
  };

  const sendMessage = async () => {
    try {
      makeMessage(newMessage, "user");
      setIsloading(true);
      const resp = await ChatService.SendMensageToOpenAI(newMessage);
      setIsloading(false);
      const AIMESSAGE = resp.data.mensaje.kwargs.content;
      makeMessage(AIMESSAGE, "bot");
    } catch (error) {
      setIsloading(false);
      console.log("error: ", error);
    }
  };

  return (
    <>
      <nav className="border-2 border-gray-200 mb-10">
        <div className="w-full mx-auto">
          <div className="mx-2 flex flex-wrap items-center justify-between">
            <a href="#" className="flex mt-4 mx-8 mb-4">
              <img src={iconbot} className="h-10 mr-3" />
              <span className="text-[#2E3191] text-[24px] self-center text-lg font-semibold whitespace-nowrap">
                UCNE CHATBOT
              </span>
            </a>
            <div className="flex md:hidden md:order-2">
              <button
                data-collapse-toggle="mobile-menu-3"
                type="button"
                className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                aria-controls="mobile-menu-3"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden md:flex justify-between items-end w-full md:w-auto md:order-1 mx-8"
              id="mobile-menu-3"
            >
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <a
                    href="#"
                    className="middle none center rounded-lg bg-blue-950 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                    aria-current="page"
                  >
                    Descubre más
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-[70rem] mx-auto my-8">
        <div className="border-transparent rounded-lg overflow-hidden ">
          <div className="flex justify-center flex-col h-[590px] ">
            <div
              ref={messagesContainerRef}
              className="bg-transparent p-4 overflow-y-auto flex-1"
            >
              {messages.map((message, index) => (
                <div className="relative" key={index}>
                  <img
                    src={message.sender === "user" ? user : iconbot}
                    className="bg-white h-5 w-5 mr-2 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                    alt="Avatar"
                  />
                  <div
                    className={`w-full border border-gray-200 outline-none py-2 px-8 my-2 p-2 rounded-lg flex flex-col ${
                      message.sender === "user"
                        ? "bg-blue-900 text-left"
                        : "bg-white-900 text-left"
                    }`}
                  >
                    <div
                      className={
                        message.sender === "user"
                          ? "text-white flex-grow"
                          : "flex-grow"
                      }
                    >
                      {message.text}
                    </div>
                    {message.sender != "user" ? (
                      <div className="flex justify-end">
                        <CopyToClipboard
                          text={dividirTextonumericoEnLineas(message.text, 75)}
                        >
                          <button>
                            <IoCopyOutline size={25} />
                          </button>
                        </CopyToClipboard>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Nuevo div con el campo de entrada y el botón en la parte inferior */}
            <div className="flex flex-col items-center">
              <div
                className={
                  isLoading
                    ? "flex flex-row items-center bg-blue-800 m-1 rounded-md p-1 w-64"
                    : "hiddenLoading"
                }
              >
                <p className="text-white m-2">Generando Respuesta</p>
                <ReactLoading
                  type={"bubbles"}
                  color={"white"}
                  height={50}
                  width={50}
                />
              </div>
              <div className="w-full p-4 flex  flex-row items-center">
                <div
                  onClick={() => {
                    setMessages([]);
                    setMessages([
                      {
                        id: 1,
                        text: getRandomMessage(),
                        sender: "bot",
                      },
                    ]);
                  }}
                  className=" flex  flex-row items-center bg-blue-800 m-5 rounded-md p-4 cursor-pointer customHover"
                >
                  <RiChatNewLine className="mb-1" color="white" size={40} />
                  <p className="hiddenText text-white m-1">Nuevo Tema</p>
                </div>
                <div className="relative flex-1">
                  <textarea
                    className="w-full border rounded-lg px-2 pb-10 py-6"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    maxLength={2000}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-500 bg-transparent hover:bg-600  px-4 py-2 rounded-lg flex items-center"
                    onClick={sendMessage}
                  >
                    {newMessage.length}/2000
                    <TbArrowBadgeRightFilled
                      className="mb-1"
                      color="blue"
                      size={40}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
function dividirTextonumericoEnLineas(texto, longitudMaxima) {
  const lineas = [];
  let lineaActual = "";

  for (let i = 0; i < texto.length; i++) {
    if (lineaActual.length === longitudMaxima || texto[i] === "\n") {
      lineas.push(lineaActual);
      lineaActual = "";

      // Si el carácter actual es un salto de línea, omítelo en la nueva línea
      if (texto[i] === "\n") {
        continue;
      }
    }
    lineaActual += texto[i];
  }

  if (lineaActual !== "") {
    lineas.push(lineaActual);
  }

  return lineas.join("\n");
}

export default Chat;
