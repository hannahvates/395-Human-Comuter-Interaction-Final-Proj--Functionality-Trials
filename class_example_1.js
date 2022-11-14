fetch(class_example_1.json)
    .then(function (response) {
        return response.json();
        // The JSON data will arrive here
        //
    })
    .then(function (data) {
            appendData(data);
        })
    .catch(function (err) {
        // If an error occured, you will catch it here
        console.log(err);
    });


function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Name: ' + data[i].major_name + ' ' + data[i].class_1;
        mainContainer.appendChild(div);
    }
}
