function launchMqtt(topictoFunc) {
    //console.log("loading mqtt...")
    outputText("Connecting MQTT..." + "\n");
    client = new Paho.MQTT.Client(location.hostname, 9001, "/ws", "Forge_app_client");
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;


    client.connect({ onSuccess: onConnect });

    function onConnect() {
        //console.log("onConnect");
        var connectText = "Connection success" + "\n"
        outputText(connectText);
        client.subscribe("TOPIC/#");
        message = new Paho.MQTT.Message("Success!");
        message.destinationName = "TOPIC/0";
        client.send(message);
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            //console.log("onConnectionLost:" + responseObject.errorMessage);
            var debugText = "onConnectionLost:" + responseObject.errorMessage + "\n";
            outputText(debugText);
        }
    }

    function onMessageArrived(message) {
        //console.log("onMessageArrived");
        var msg = message.payloadString;
        var tp = message.destinationName;

        //append Extension softwares here
        accessmanager(topictoFunc,tp,msg);
        smartlock(topictoFunc,tp,msg);

        filteringMqtt(tp, msg);
    }
}

function filteringMqtt(tp, msg) {

    var consoleText = "No." + tp + ":" + msg + "\n";
    //console.log(iotNumber);
    //console.log(consoleText);
    outputText(consoleText);
}

function outputText(msg) {
    var console1 = $('#console1 div')
    var console2 = $('#console1')
    console1.append($("<code>").html(msg.replace(/\n/g, '<br>')));
    console2.scrollTop(console2.scrollTop() + 10000);

}

function outputSetting(setting) {
    var console1 = $('#console2 div')
    var console2 = $('#console2')
    console1.append($("<code>").html(setting.replace(/\n/g, '<br>')));
    console2.scrollTop(console2.scrollTop() + 10000);
}

function iotListImport(data) {
    SettingList = data;
    outputSetting("dataset is available!" + "\n");
}





