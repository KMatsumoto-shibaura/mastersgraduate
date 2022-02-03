function accessmanager(topictoFunc, tp, msg) {
    if(topictoFunc.TOUCH == tp){
        outputSetting("VA_AccessManager is called! with:" + msg + "\n");
        outputSetting("TOUCH activated");
        let now = new Date();
        var data = now + "||" + msg
        download("accesslog.txt").then(value => {
            if (value === null) {
                var datalist = [];
                datalist.push(data);
                upload("accesslog.txt", datalist);
    
            } else {
                var importdata = value.data
                importdata.push(data);
                upload("accesslog.txt", importdata);
            }
        })
    }
}