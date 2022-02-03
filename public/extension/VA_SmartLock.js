var mode = 0;
function smartlock(topictoFunc, tp, msg) {
    if (topictoFunc.TOUCH == tp) {
        switch (mode) {
            case 0:
                outputSetting("SmartLock opening... With: " + msg + "\n");
                message = new Paho.MQTT.Message("open");
                message.destinationName = "TOPIC/1";
                client.send(message);
                mode = 1;
                break;
            
            case 1:
                outputSetting("SmartLock closing... With: " + msg + "\n");
                message = new Paho.MQTT.Message("close");
                message.destinationName = "TOPIC/2";
                client.send(message);
                mode = 0;
                break;
        }
    }

    if (topictoFunc.OPEN == tp) {
        outputSetting("OPEN activated" + "\n")
    }

    if (topictoFunc.CLOSE == tp) {
        outputSetting("CLOSE activated" + "\n")
    }

}