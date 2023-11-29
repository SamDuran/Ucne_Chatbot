import React, { useState, useEffect, useRef } from "react";
import iconbot from "../../assets/Vector.png";
import user from "../../assets/user.png";
import en_linea from "../../assets/EnLinea.svg";
import pagefooter from "../../assets/UcneFooter.svg";
import desconectado from "../../assets/Desconectado.svg";
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
      <div className="flex h-full w-full relative flex-col">
        <nav className="border-2 border-gray-200 mb-10">
          <div className="w-full mx-auto relative bg-white">
            <div className="mx-2 flex flex-wrap items-center justify-between">
              <a href="/Chat" className="flex mt-4 mx-8 mb-4">
                  <img src={iconbot} className="h-12 mr-3 mt-1" />
                <div className="flex flex-col">
                  <span className="text-[#2E3191] text-[26px] self-center text-lg font-bold whitespace-nowrap">
                    UCNE CHATBOT
                  </span>
                  {
                    true
                      ? (<img src={en_linea} className="w-[45%] ms-1"/>)
                      : (<img src={desconectado} className="w-[70%] ms-1"/>)
                  }
                </div>
              </a>
              <div
                className="hidden md:flex justify-between items-end w-full md:w-auto md:order-1 mx-8"
                id="mobile-menu-3"
                >
                <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                  <li>
                    <a
                      href="/Team"
                      className='middle none center rounded-2xl bg-blue-950 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
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

        <div className="w-[70rem] mx-auto">
          <div className="border-transparent rounded-lg overflow-hidden ">
            <div className="flex justify-center flex-col h-[590px] ">
              <div
                ref={messagesContainerRef}
                className="bg-transparent p-4 overflow-y-auto flex-1"
              >
                {messages.map((message, index) => (
                  <div className="relative bg-white" key={index}>
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

        <div className="w-auto h-[5%] flex justify-center items-end">
          <img src={pagefooter} className="w-full"/>
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