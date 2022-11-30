document.getElementById("search_button").addEventListener("click", search);

function search() {
    var major_search = document.getElementById("class_search").value;
    fetch('class_example_1.json')
        .then(function (response) {
            return response.json();
            // The JSON data will arrive here
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            // If an error occured, you will catch it here
            console.log(err);
        });

    function appendData(data) {
        var mainContainer = document.getElementById("class1");
        for (var i = 0; i < data.length; i++) {
            var div = document.createElement("div");
            div.innerHTML = data[i].major_name;
            mainContainer.appendChild(div);
        }
    }

    function findClass(obj, prop, defval){
        if (typeof defval == 'undefined') defval = null;
        prop = prop.split('.');
        for (var i = 0; i < prop.length; i++) {
            if(typeof obj[prop[i]] == 'undefined')
                return defval;
            obj = obj[prop[i]];
        }
        return obj;
    }

}
