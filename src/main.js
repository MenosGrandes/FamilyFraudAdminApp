import './style.css'
import {setupStatics} from "./utils.js"

document.querySelector('#app').innerHTML = `
<div>
  <h1>Family Fraud Admin APP</h1>
  <div id=new_question_generator>
    <label for="quantity">No of questions?</label>
    <input type="number" id="quantity" name="quantity" min="3" max="5" value="3"/> 
    <button id=generate_new_question>GENERATE NEW QUESTION</button>
  </div>
  <div id="show_answers_container"></div>
  <div id="server_connected"></div>
</div>
`

setupStatics();
