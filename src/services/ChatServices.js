import httpCliente from "./httpCliente";

/**
 * pregunta del usuario
 * @param userMessage {String}
 */
const SendMensageToOpenAI = async (userMessage) => {
  return await httpCliente.get(`getResponseAI/${userMessage}`);
};

export const ChatService = {
  SendMensageToOpenAI,
};