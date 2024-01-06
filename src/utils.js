import { nanoid } from "nanoid";
import { APP_TYPE, Messages, TOPIC } from "./common_lib.js"; //MenosGrandes add this file into config..

export class WebSocketCommunicationHandler {
  _send(msgCallback) {
    msgCallback["id"] = this.app_id;
    this.webSocket.send(JSON.stringify(msgCallback));
  }
  _handleMessage(msg) {
    const data = JSON.parse(msg.data);
    console.log("DATA AFTER PARSE");
    console.log(data);
    switch (data.topic) {
      case TOPIC.NEW_ANSWERS: {
        generateAnswersContainer(data);
        break;
      }
    }
  }
  constructor() {
    this.webSocket = new WebSocket("ws://localhost:443/");

    this.webSocket.onmessage = (event) => {
      this._handleMessage(event);
    };
    this.webSocket.onopen = () => {
      if (this.app_id === undefined) {
        this.app_id = nanoid();
        console.log(this.app_id + "generated ID");
      }
      this._send(Messages.setId(APP_TYPE.ADMIN));
    };
  }
  /*MenosGrandes this suppose to be send from the ADMINISTATOR APP, the one that is not visible for clients*/
  show_answer(id) {
    this._send(Messages.showAnswer(id));
  }
  request_new_question(quantity) {
    this._send(Messages.getNewAnswers(quantity));
  }
  live_lost() {
    //this._send(Messages.lifeLost());
  }
}
const ws = new WebSocketCommunicationHandler();


const generateAnswerString = (answer) =>
{
  return answer.answer + ' [' + answer.points + ']';
}
const generateAnswersContainer = (msg) => {
  const answer_container = document.querySelector("#show_answers_container");
  answer_container.innerHTML = "";
  console.log(msg);
  for (let i = 0; i < msg.answers.length; i++) {
    const _button = document.createElement("button");
    _button.id = i;
    _button.innerHTML = generateAnswerString(msg.answers[i]);
    answer_container.appendChild(_button);
    _button.addEventListener("click", () => ws.show_answer(i));
  }
};
const newQuestion = () => {
  const quantity = document.querySelector("#quantity").value;
  console.log(quantity);
  ws.request_new_question(quantity);
  //sendOverWS
};
export const setupStatics = () => {
  document
    .querySelector("#generate_new_question")
    .addEventListener("click", () => newQuestion(quantity));
};
