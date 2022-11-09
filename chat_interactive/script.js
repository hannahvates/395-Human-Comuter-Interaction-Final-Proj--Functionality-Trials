let input_box = document.getElementById("chat_box"); //Variable to access contents of text input
let message_obj = document.getElementById("messages"); //Variable to change contents of area where messages are sent
let input_list = []; //List containing all inputs
let message_count = 0; //Initialize count of number of messages sent

function sendMessage() { //Function that takes contents of text input and displays it as a sent message in the chat
  let sent_message = input_box.value; //Initialize variable containing the sent message
  if (sent_message === "") {
    return; //If no input, don't do anything
  }
  input_list.push(sent_message); //Add input to back of list of inputs
  input_box.value = ""; //Input is cleared
  message_count++; //Increment message count
  document.getElementById("messages").innerHTML = ""; //Clear out contents of messages
  if (message_count === 1) {
    let child = document.createElement('div'); //Prepare value to attach to HTML
    child.className = "sent_message";
    child.innerHTML = input_list[0];
    message_obj.appendChild(child);
  } else {
    for (let i = 0; i < message_count; i++) {
      let child = document.createElement('div'); //Prepare value to attach to HTML
      child.className = "sent_message";
      child.innerHTML = input_list[message_count-i-1];
      message_obj.appendChild(child);
    }
  }
}
