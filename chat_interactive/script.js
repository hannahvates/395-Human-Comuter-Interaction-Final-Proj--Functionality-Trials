//Messages variables
let input_box = document.getElementById("chat_box"); //Variable to access contents of text input
let message_obj = document.getElementById("messages"); //Variable to change contents of area where messages are sent
let message_list = []; //List containing all messages from all chats
let message_count = 0; //Initialize count of number of messages sent for current chat
let current_chat = -1; //Initialize variable that matches the number of the current chat loaded; initiazized to -1 because you will never have -1 classes

//CLass list variables
let class_list_obj = document.getElementById("class_list");
let class_count = 0; //Initialize count of number of classes

function sendMessage() { //Function that takes contents of text input and displays it as a sent message in the chat
  let sent_message = input_box.value; //Initialize variable containing the sent message
  if (sent_message === "" || current_chat === -1) {
    return; //If no input/selected class, don't do anything
  }
  message_list[current_chat].push(sent_message); //Add input to back of list of inputs
  input_box.value = ""; //Input is cleared
  message_count++; //Increment message count
  message_obj.innerHTML = ""; //Clear out contents of messages
  for (let i = 0; i < message_count; i++) {
    let child = document.createElement('div'); //Prepare value to attach to HTML
    child.className = "sent_message"; //Add sent_message class to the child
    child.innerHTML = `<span class="sent_message_span">${message_list[current_chat][message_count-i-1]}</span>`; //Write contents of message to child
    message_obj.appendChild(child); //Append HTML for message
  }
}

function addClass() { //Adds a new class to be selected from the list of classes. Will later also add class to profile.
  if (class_count === 0) {
    document.getElementById("no_classes_text").innerHTML = ""; //Delete no classes text
  }
  message_list.push([]); //Add new list of messages to list of lists of messages corresponding to the added class
  class_count++;
  let child = document.createElement('div'); //Prepare value to attach to HTML
  child.innerHTML = `<input type="button" name="class_${class_count-1}_button" value="Class ${class_count-1}" id="class_${class_count-1}_button" onclick="loadMessages(${class_count-1})">`; //Write button to child, subtracts one from class_count to start counting at 0
  class_list_obj.appendChild(child); //Append HTML for class
}

function loadMessages(class_number) { //Load the messages from the current chat into the message window, parameter should match the number of the chat you wish to switch to
  message_obj.innerHTML = ""; //Clear out contents of messages
  if (current_chat != -1) { //If a chat is currently selected...
    document.getElementById(`class_${current_chat}_button`).classList.remove("selected_chat"); //Remove styling that shows selection from current selected chat button
  }
  current_chat = class_number; //Set current chat to correspond to the class number needed
  document.getElementById(`class_${current_chat}_button`).className = "selected_chat"; //Add styling that shows selection to current selected chat button
  if (message_list[current_chat].length === 0) { //If no messages are saved for current chat...
    let child = document.createElement('div'); //Prepare value to attach to HTML
    child.innerHTML = "No messages."; // Display "No messages" text
    message_obj.appendChild(child); //Append HTML for message
    message_count = 0; // There are no messages, so message_count = 0
    return; //End method
  }
  message_count = message_list[current_chat].length; //Message count is set to the number of messages in the current chat
  for (let i = 0; i < message_count; i++) {
    let child = document.createElement('div'); //Prepare value to attach to HTML
    child.className = "sent_message"; //Add sent_message class to the child
    child.innerHTML = `<span class="sent_message_span">${message_list[current_chat][message_count-i-1]}</span>`; //Write contents of message to child
    message_obj.appendChild(child); //Append HTML for message
  }
}
