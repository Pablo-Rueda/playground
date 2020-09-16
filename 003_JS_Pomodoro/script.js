let pomodoro = {
  min:  25,
  sec: 00,
  countDown: 0,
  timer: function(){ 
     if (this.sec == 0 && this.min == 0){
     } else {
        if(this.sec == 0){
           this.min = this.min - 1;
           this.sec = 60;
         }
        this.sec = this.sec - 1;
     }
  },
  play: function(){
    this.countDown = 1;
  },
   pause: function(){
    this.countDown = 0;
  },
  reset: function (){
    this.min = 25;
    this.sec = 00;
    this.countDown = 0
  }
}

 setInterval(function(){ 
if( pomodoro.countDown == 1){
 pomodoro.timer()
} 
document.getElementById("timer").innerHTML = pomodoro.min + "m " + pomodoro.sec + "s";
   
}, 1000);



