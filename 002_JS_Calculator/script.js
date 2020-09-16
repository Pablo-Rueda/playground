function changeOutput(input) {
    var print = document.getElementById("output").innerHTML;
    if((print == "0" &
       (['/', '*', '-', '+'].indexOf(input) >= 0)) |
        print == "ERROR"){
      var a = "ERROR";
    }else if(print == "0" &
       (!(['/', '*', '-', '+','.'].indexOf(input) >= 0))){
        var a = input;
    }else if( (['/', '*', '-', '+','.'].indexOf(input) >= 0)&
              (['/', '*', '-', '+','.'].indexOf(print[print.length-1]) >= 0)){
        var a = "ERROR";
    }else{
      var a = print + input;
    }
    document.getElementById("output").innerHTML = a;
  }
  
  function reset() {
    var output = 0;
    document.getElementById("output").innerHTML = output;
  }
  
  function calculate(){
      var print = document.getElementById("output").innerHTML;
      var solution = eval(print);
      document.getElementById("output").innerHTML = solution;
  }