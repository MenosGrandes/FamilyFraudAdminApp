import { Messages } from "./common_lib.js"; //MenosGrandes add this file into config..

export class WebSocketCommunicationHandler {
  _send(msgCallback) {
    this.webSocket.send(JSON.stringify(msgCallback));
  }
  _handleMessage(msg) {
    const data = JSON.parse(msg.data);
    console.log("DATA AFTER PARSE");
    console.log(data);
    /*
    switch (data.topic) {
      case TOPIC.SHOW_ANSWER:
        var tmp = get(answers);
        tmp[data.index].isVisible = true;
        answers.set(tmp);
        break;
      case TOPIC.NEW_ANSWERS:
        answers.set(data.answers);
        break;
    }*/
  }
  constructor() {
    this.webSocket = new WebSocket("ws://localhost:443/");

    this.webSocket.onmessage = (event) => {
      this._handleMessage(event);
    };
    this.webSocket.onopen = () => {
      //this._send(Messages.getNewAnswers(5));
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
const  generateAnswersContainer = (quantity) =>
{
  const answer_container = document.querySelector("#show_answers_container");
  answer_container.innerHTML=''
  console.log(answer_container);
  for(let i = 0 ; i < quantity; i++)
  {
      const _button = document.createElement("button");
      _button.id=i;
      _button.innerHTML=i;
      answer_container.appendChild(_button);
      _button.addEventListener('click', () =>ws.show_answer(i));

  }
}
const newQuestion = () =>
{
  const quantity = document.querySelector("#quantity").value;
  console.log(quantity);
  ws.request_new_question(quantity);
  generateAnswersContainer(quantity);
  //sendOverWS
}
export const setupStatics = () =>
{
  document.querySelector("#generate_new_question").addEventListener('click', () => newQuestion(quantity));
}
