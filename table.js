table = {
    size: 300,
    dots: 200
}

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = 610;

var c = canvas.getContext('2d');

center = [window.innerWidth/2,305];

let dots = [];

const dot_rad = 5;

var multican = 0;

function drawCircle(cord){
    //console.log(cord)
    c.beginPath();
    c.arc(cord[0],cord[1],dot_rad,0,Math.PI*2,false);
    c.stroke();
}

function drawLine(start,end){
    c.beginPath()
    c.moveTo(start[0],start[1])
    c.lineTo(end[0],end[1])
    c.strokeStyle = "#0000FF"
    c.stroke();
}

var angSlope = 360/table.dots

for(let i =0;i<table.dots;i++){
    let angle = angSlope*(i);
    let x = Math.cos(angle*(Math.PI/180))*table.size;
    let y = Math.sin(angle*(Math.PI/180))*table.size;
    dots.push([x+center[0],y+center[1]]);
}






function animate(){
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    requestAnimationFrame(animate);

    dots.forEach(drawCircle);

    for(let d = 0;d < dots.length;d++){
        //console.log(Math.round((d)*multican % (dots.length)))
        try {
            drawLine(dots[d],dots[Math.round((d)*multican % (dots.length))]);
        } catch (error) {}
        
        
    }

    multican += 0.01;
    

}
animate()
    

