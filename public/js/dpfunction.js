async function download(path) {
    var returnData = await axios({
        method: 'post',
        url: 'https://content.dropboxapi.com/2/files/download',
        headers: {
            'Authorization': 'Bearer eKBRX2AJxiUAAAAAAAAAAdkhhgUQ6ber8UYu71J8zetLJbwEn-jhs3GXhfaL1Pic',
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                "path": "/Test01/" + path
            })
        }
    }).catch(error => {
        var emptydataset = null
        console.log(error);
        return emptydataset;
    })
    //console.log(returnData);
    return returnData;
}

function upload(path, data){
    axios({
        method: 'post',
        url: 'https://content.dropboxapi.com/2/files/upload',
        data: data,  //アップロードするテキスト
        headers: {
            'Authorization': 'Bearer eKBRX2AJxiUAAAAAAAAAAdkhhgUQ6ber8UYu71J8zetLJbwEn-jhs3GXhfaL1Pic',
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                "path": "/Test01/" + path, //アップロード時のファイルパス
                "mode": "overwrite",
            }) //モード(下記参照)
        }
    }).then(response => {

    }).catch(error => {
        console.log(error);
    }).then(() => {
        outputSetting("Data is uploaded" + "\n");
        outputSetting("-----End of the setting-----" + "\n");
    });
}