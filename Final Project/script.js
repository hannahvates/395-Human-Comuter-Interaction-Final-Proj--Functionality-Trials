//Messages variables
let input_box = document.getElementById("text"); //Variable to access contents of text input
let message_obj = document.getElementById("all_sent_messages"); //Variable to change contents of area where messages are sent
let other_message_obj = document.getElementById("other_messages"); //Variable to access contents of the other messages in chats
let message_list = [[],[]]; //List containing all messages from all chats
let message_count = 0; //Initialize count of number of messages sent for current chat
let header_obj = document.getElementById("box_header"); //Holds chat header contents

//CLass list variables
let class_list_obj = document.getElementById("class_list");
let class_count = 2; //Initialize count of number of classes; initialized to 2 because we default to 2 classes
let current_chat_number = 0; //Initialize variable that matches the number of the current chat loaded; initialized to 0 since we start with the first class selected
let chat_id_table = ["cmsc_395", "math_212"]; //Table that holds all added class IDs


function sendMessage() { //Function that takes contents of text input and displays it as a sent message in the chat
  let sent_message = input_box.value; //Initialize variable containing the sent message

  if (sent_message === "") {
    return; //If no input, don't do anything
  }

  message_list[current_chat_number].push(sent_message); //Add input to back of list of inputs
  input_box.value = ""; //Input is cleared
  message_count++; //Increment message count
  message_obj.innerHTML = ""; //Clear out contents of messages

  for (let i = 0; i < message_count; i++) {
    let child = document.createElement('div'); //Prepare value to attach to HTML
    child.className = "sent_message"; //Add sent_message class to the child
    child.innerHTML = `<span class="sent_message_span">${message_list[current_chat_number][message_count-i-1]}</span>`; //Write contents of message to child
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
  console.log(class_number);
  console.log(current_chat_number);

  if (class_number === current_chat_number) {
    return; //If the class you are changing to is the same as the current class, don't do anything
  }

  if (current_chat_number == 1) {
    header_obj.innerHTML = `<h2>CMSC 395</h2>`; //If class is CS 395, change header to reflect that
  }
  if (current_chat_number == 0) {
    header_obj.innerHTML = `<h2>MATH 212</h2>`; //If class is Math 212, change header to reflect that
  }

  message_obj.innerHTML = ""; //Clear out contents of messages
  other_message_obj.innerHTML = ""; //CLear out contents of other messages
  let other_child = document.createElement('div');
  other_child.className = "other_sent_message";

  if (current_chat_number == 0) { //If in the Math 212 chat, change the previously sent messages to the ones in Math 212
    other_child.innerHTML = `<span class="other_sent_message_span">Could someone explain Euler's to me again?</span>`;
  }
  if (current_chat_number == 1) { //If in the CS 395 chat, change the previously sent messages to the ones in CS 395
    let other_child1 = document.createElement('div');
    other_child1.className = "other_sent_message";
    other_child1.innerHTML = `<span class="other_sent_message_span">I need help for the HTML HW!!!</span>`;
    other_message_obj.append(other_child1);
    other_child.innerHTML = `<span class="other_sent_message_span">Does anyone want to meet and study?</span>`;
  }

  other_message_obj.append(other_child);
  document.getElementById(`${chat_id_table[current_chat_number]}`).className = "inactive_chat"; //Add styling for unselected chat buttons to deselected class
  document.getElementById(`${chat_id_table[current_chat_number]}`).classList.remove("active_chat"); //Remove styling that shows selection from current selected chat button
  let inactive_line = chat_id_table[current_chat_number] + "_line"
  document.getElementById(`${inactive_line}`).className = "bottom_line"; //Add styling for unselected chat buttons to deselected class
  document.getElementById(`${inactive_line}`).classList.remove("bottom_line_invisible"); //Remove styling that shows selection from current selected chat button
  current_chat_number = class_number; //Set current chat to correspond to the class number needed
  let active_line = chat_id_table[current_chat_number] + "_line"
  document.getElementById(`${chat_id_table[current_chat_number]}`).className = "active_chat"; //Add styling that shows selection to current selected chat button
  document.getElementById(`${active_line}`).className = "bottom_line_invisible"; //Add styling for unselected chat buttons to deselected class
  document.getElementById(`${active_line}`).classList.remove("bottom_line"); //Remove styling that shows selection from current selected chat button

  if (message_list[current_chat_number].length === 0) { //If no messages are saved for current chat...
    let child = document.createElement('div'); //Prepare value to attach to HTML
    message_obj.appendChild(child); //Append HTML for message
    message_count = 0; // There are no messages, so message_count = 0
    return; //End method
  }

  message_count = message_list[current_chat_number].length; //Message count is set to the number of messages in the current chat

  for (let i = 0; i < message_count; i++) {
    let child = document.createElement('div'); //Prepare value to attach to HTML
    child.className = "sent_message"; //Add sent_message class to the child
    child.innerHTML = `<span class="sent_message_span">${message_list[current_chat_number][message_count-i-1]}</span>`; //Write contents of message to child
    message_obj.appendChild(child); //Append HTML for message
  }
}
