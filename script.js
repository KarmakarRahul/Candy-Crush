
let candy = [0,1,2,3,4,5];
let box =[];
let rows=8;
let coloums=8;
let score=0;
let flag=false;

// extracting image
let curImg;
let nextImg;

// for timer
let sec=-1;
let min=0;

//for audio
let path="./audio/a.mp3";
let audio=new Audio(path);

// timer function
let handler = function() {
    sec++;
    if(sec>59){
        sec=0;
        min++;
    }
    document.getElementById("timer").textContent = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
  };
  setInterval(handler, 1000);
  handler();

//   function to generates random candies
function generates_random_candies() {
    return candy[Math.floor(Math.random()*candy.length)];
}

// initialising candies to box function
function start_game() {

    for(let r=0; r < rows; r++) {
        let row=[];
        for(let c=0; c < coloums; c++){
            let img=document.createElement('img');
            img.id=r.toString() +"-"+ c.toString();
            img.src= "./photos/" + generates_random_candies() + ".png" ;
            document.getElementById('box').append(img);
            

            img.addEventListener('dragstart', dragstart);
            img.addEventListener("dragenter" , dragenter);
            img.addEventListener("dragover" , dragover);
            // img.addEventListener("dragleave" , dragleave);
            img.addEventListener("drop" , dragdrop);
            img.addEventListener("dragend" , dragend);
            row.push(img);
            
        }
         box.push(row);           
    }
}

window.onload=function() {

    start_game();
  window.setInterval(function(){
        crush_candy_5();
        crush_candy_4();
        crush_candy();
        document.getElementById('score').innerHTML=score;
        candy_slider();
        candy_generator();
    },100);
}


function dragstart() {
    curImg=this;
    flag=true;
    
}

function dragenter(e) {
    e.preventDefault();
   
}

function dragover(e) {
    e.preventDefault();

}

function dragdrop() {
    nextImg=this;
}

function dragend() {
    if( curImg.src.includes("Black_colour")  ||  nextImg.src.includes("Black_colour")) {
        return;
    }

    let rCo=curImg.id;
    let r=rCo[0];
    let c=rCo[2];

    let cCo=nextImg.id;
    let r1=cCo[0];
    let c1=cCo[2];

    let check=(r==r1 && (Math.abs(c-c1)==1) || c==c1 && (Math.abs(r-r1)==1));
    if(check){

    let curr=curImg.src;
    let next=nextImg.src;
    curImg.src=next;
    nextImg.src=curr;

    // checking valid move
    let validMove=check_move();
    if(validMove==false){
      let curr=curImg.src;
      let next=nextImg.src;
      let beep=new Audio("./audio/b.mp3");
      beep.play();
      setTimeout(function(){
      curImg.src=next;
      nextImg.src=curr;
      },200);
    }
    }
    
}


//checking valid move
function check_move(ro,co) {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-2; j++) {
            let candy1=box[i][j];
            let candy2=box[i][j+1];
            let candy3=box[i][j+2];
            
            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("Black_colour")) {
                return true;

            }
        }
    }

    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-2; j++) {
            let candy1=box[j][i];
            let candy2=box[j+1][i];
            let candy3=box[j+2][i];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("Black_colour")) {
               return true;

            }
        }
    }
    return false;
}

// crushing candy 3
function crush_candy() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-2; j++) {
            let candy1=box[i][j];
            let candy2=box[i][j+1];
            let candy3=box[i][j+2];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("Black_colour")) {
                candy1.src="./photos/Black_colour.jpg";
                candy2.src="./photos/Black_colour.jpg";
                candy3.src="./photos/Black_colour.jpg";
                audio.play();
                audio.volume=0.8;
                if(flag==true){
                score+=3;
                }

            }
        }
    }

    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-2; j++) {
            let candy1=box[j][i];
            let candy2=box[j+1][i];
            let candy3=box[j+2][i];

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("Black_colour")) {
                candy1.src="./photos/Black_colour.jpg";
                candy2.src="./photos/Black_colour.jpg";
                candy3.src="./photos/Black_colour.jpg";
                audio.play();
                audio.volume=0.8;
                if(flag==true){
                score+=3;
                }

            }
        }
    }
}

//crushing candy 4
function crush_candy_4() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-3; j++) {
            let candy1=box[i][j];
            let candy2=box[i][j+1];
            let candy3=box[i][j+2];
            let candy4=box[i][j+3];

            if(candy1.src==candy2.src && candy2.src==candy3.src && candy3.src==candy4.src &&  !candy1.src.includes("Black_colour")) {
                candy1.src="./photos/Black_colour.jpg";
                candy2.src="./photos/Black_colour.jpg";
                candy3.src="./photos/Black_colour.jpg";
                candy4.src="./photos/Black_colour.jpg";
                audio.play();
                audio.volume=0.8;
                if(flag==true){
                score+=4;
                }

            }
        }
    }

    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-3; j++) {
            let candy1=box[j][i];
            let candy2=box[j+1][i];
            let candy3=box[j+2][i];
            let candy4=box[j+3][i];

            if(candy1.src==candy2.src && candy2.src==candy3.src && candy3.src==candy4.src && !candy1.src.includes("Black_colour")) {
                candy1.src="./photos/Black_colour.jpg";
                candy2.src="./photos/Black_colour.jpg";
                candy3.src="./photos/Black_colour.jpg";
                candy4.src="./photos/Black_colour.jpg";
                audio.play();
                audio.volume=0.8;
                if(flag==true){
                score+=4;
                }

            }
        }
    }
}


//crushing candy 5
function crush_candy_5() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-4; j++) {
            let candy1=box[i][j];
            let candy2=box[i][j+1];
            let candy3=box[i][j+2];
            let candy4=box[i][j+3];
            let candy5=box[i][j+4];

            if(candy1.src==candy2.src && candy2.src==candy3.src && candy3.src==candy4.src && candy4.src==candy5.src && !candy1.src.includes("Black_colour")) {
                candy1.src="./photos/Black_colour.jpg";
                candy2.src="./photos/Black_colour.jpg";
                candy3.src="./photos/Black_colour.jpg";
                candy4.src="./photos/Black_colour.jpg";
                candy5.src="./photos/Black_colour.jpg";
                audio.play();
                audio.volume=0.8;
                if(flag==true){
                score+=5;
                }

            }
        }
    }

    for(let i=0; i<rows; i++) {
        for(let j=0; j<coloums-4; j++) {
            let candy1=box[j][i];
            let candy2=box[j+1][i];
            let candy3=box[j+2][i];
            let candy4=box[j+3][i];
            let candy5=box[j+4][i];

            if(candy1.src==candy2.src && candy2.src==candy3.src && candy3.src==candy4.src && candy4.src==candy5.src && !candy1.src.includes("Black_colour")) {
                candy1.src="./photos/Black_colour.jpg";
                candy2.src="./photos/Black_colour.jpg";
                candy3.src="./photos/Black_colour.jpg";
                candy4.src="./photos/Black_colour.jpg";
                candy5.src="./photos/Black_colour.jpg";
                audio.play();
                audio.volume=0.8;
                if(flag==true){
                score+=5;
                }

            }
        }
    }
}


//sliding candies downward
function candy_slider() {
    for(let i=0; i<rows; i++) {

        let row=rows-1;
        for(let j=coloums-1; j>=0; j--) {
            if(!box[j][i].src.includes("Black_colour")) {
                box[row][i].src=box[j][i].src;
                row=row-1;
            }
        }

        for(let k=row; k>=0; k--) {
            box[k][i].src="./photos/Black_colour.jpg";
        }
    }
}

//generating candies
function candy_generator() {
    for(let i=0; i<coloums; i++) {
        if(box[0][i].src.includes("Black_colour")){
        box[0][i].src="./photos/" + generates_random_candies() + ".png" ;
        }
    }
}

