const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});

const myFunction = async function(e) {
    while (true){
        try{
            xmlhttp=new XMLHttpRequest();
            xmlhttp.open("GET", ("http://decapi.me/twitch/followcount/"+e), false);

            xmlhttp.send();

            self.postMessage(xmlhttp.responseText);
            await delay(1000);
        }         
        catch(es){

        }
    }
}
self.addEventListener('message', function(e) {
        myFunction(e.data);
});
    

    

    
