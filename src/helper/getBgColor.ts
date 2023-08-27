import { type Question } from "../types";

const getBackGroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  //Usuario no ha selecionado nada todavia
  if (userSelectedAnswer == null) return "transparent";
  //Si selecciono la incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  //si selecciono la correcta
  if (index === correctAnswer) return "green";
  //si esta es la seleccion del usuario pero no es la correta
  if (index === userSelectedAnswer) return "red";
  //si no es ninguna de las anteriores
  return "transparent";
};

export default getBackGroundColor;
