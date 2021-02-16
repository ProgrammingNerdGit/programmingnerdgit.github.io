var url = new URL(window.location.href);
var user = url.searchParams.get("user");

var body = document.querySelector("body");


let canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let img = document.getElementById('img');

let size = {
    width: 1280,
    height: 720
}

body.width = size.width;
body.height = size.height;

let vel = 2;

canvas.width = size.width; canvas.height = size.height;



class folower{
    constructor(sizes,vel){
        this.vel = vel;
        this.size = sizes;
        this.x = Math.random()*(size.width/2);
        this.y = Math.random()*(size.height/2);
        this.vel = vel;
        this.rotation = 0;
        this.angle = Math.random()*(Math.PI*2);
        this.dx = Math.cos(this.angle)*vel;this.dy = Math.sin(this.angle)*vel;
    }
    draw(){
        ctx.drawImage(img,this.x,this.y,img.width*this.size,img.height*this.size);
    }
    move(){
        this.x += this.dx;
        this.y += this.dy;

        let both = 0;
        if(this.y >= size.height-(img.height*this.size) || this.y <= 0){this.dy *= -1;both++;}
        if(this.x >= size.width-(img.width*this.size)|| this.x <= 0){this.dx *= -1,both++;}
        if(both == 2){
            this.vel *= 3;
        }
    }
}

folowers = [];



let prev = 0;

xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET", ("http://decapi.me/twitch/followcount/"+user), false);

xmlhttp.send();

prev = parseInt(xmlhttp.responseText);

get.addEventListener('message', function(e) {
    console.log(e.data);
    if(parseInt(e.data) > prev){
        
        for(let i = 0;i<(parseInt(e.data)-prev);i++){
            folowers.push(new folower(1,vel));
        }
        
    }
    prev = parseInt(e.data);
});
get.postMessage(user);
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, size.width, size.height);
    folowers.forEach(element => {
        element.draw();
        element.move();
    });

    
    

    
    
}
animate();

