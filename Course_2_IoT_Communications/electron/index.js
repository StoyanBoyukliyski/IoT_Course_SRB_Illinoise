document.onkeydown = updateKey;
document.onkeyup = resetKey;

var server_port = 65432;
var server_addr = "192.168.178.196";   // the IP address of your Raspberry PI

function send_data_t(data) {
    const net = require('net');
    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // send the message
        client.write(`${data}`);
    });
}

function client(){
    
    const net = require('net');
    var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        try {
            // Parse the received data as JSON
            const jsonData = JSON.parse(data);
    
            // Assuming jsonData is an object with properties you want to assign to variables
            // For example, if jsonData has properties 'property1' and 'property2':
            const cpu_temperature = jsonData.cpu_temperature;
            const gpu_temperature = jsonData.gpu_temperature;
            const cpu_usage = jsonData.cpu_usage;
            const power_read = jsonData.battery;
            // Assign the values to HTML elements or do further processing
            document.getElementById("cpu_temperature").innerHTML = cpu_temperature;
            document.getElementById("gpu_temperature").innerHTML = gpu_temperature;
            document.getElementById("cpu_usage").innerHTML = cpu_usage;
            document.getElementById("power_read").innerHTML = power_read;
            // You can access the parsed data as variables here
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    
        // Close the connection after processing data
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });


}

// for detecting which key is been pressed w,a,s,d
function updateKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
        // up (w)
        document.getElementById("upArrow").style.color = "green";
        send_data_t("87");
    }
    else if (e.keyCode == '83') {
        // down (s)
        document.getElementById("downArrow").style.color = "green";
        send_data_t("83");
    }
    else if (e.keyCode == '65') {
        // left (a)
        document.getElementById("leftArrow").style.color = "green";
        send_data_t("65");
    }
    else if (e.keyCode == '68') {
        // right (d)
        document.getElementById("rightArrow").style.color = "green";
        send_data_t("68");
    }
    else if (e.keyCode == '88') {
        // right (d)
        document.getElementById("Stop").style.color = "green";
        send_data_t("stop");
    }
}

// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
    document.getElementById("Stop").style.color = "grey";

}


// update data for every 50ms
function update_data(){
    setInterval(function(){
        // get image from python server
        client();
    }, 2000);
}
