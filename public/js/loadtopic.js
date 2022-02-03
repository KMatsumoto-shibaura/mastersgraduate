function loadtopic(urn) {
    //var myId = this.viewer.getSelection();
    var uId;
    var view_contents;
    var contents_properties;
    let topictoFunc = {};

    setUid();

    async function getViewerId(access_token) {
        await jQuery.get({
            url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/' + urn + '/manifest',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (res) {
                view_contents = res;
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    async function getProperty(access_token, dbId) {
        await jQuery.get({
            url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/' + urn + '/metadata/' + dbId + '/properties',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (res) {
                //console.log(res);
                contents_properties = res;
            },
            error: function (err) {
                console.log(err)
                //console.log(err.responseJSON)
            }
        });
    }

    async function setUid() {
        await getForgeToken(function (access_token) {
            getViewerId(access_token).then(() => {
                //console.log(view_contents);
                uId = view_contents.derivatives[0].children[2].children[1].guid;
                //console.log(uId);
                getUid();

            })
        })
    }

    function getUid() {
        //console.log(uId);
        getForgeI_Token(function (access_token) {
            getProperty(access_token, uId).then(() => {
                //console.log(contents_properties);
                var getThisproperties = contents_properties.data.collection
                for (let data of getThisproperties) {
                    if (data.properties.一般) {
                        var reg = new RegExp(/\[\d*\]/)
                        //console.log(data.name);
                        if (reg.test(data.name)) {
                            var topicFunc = data.properties.データ
                            for(let val in topicFunc){
                                topictoFunc[val] = topicFunc[val];
                            }
                        }
                    }
                }
                launchMqtt(topictoFunc);
            })
        });
    }
}