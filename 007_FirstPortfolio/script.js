/* Add Open Tab */
function showTab(evt, tabId) {
    // call tabs, don't display
    var tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
    }
    // call buttons, deactivate
    var buttons = document.getElementsByClassName("btn");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }
    // activate button, open tab
    document.getElementById(tabId).style.display = "block";
    evt.currentTarget.className += " active";
  }



  /*  Nav Bar */
  var navBar ={
    /* Open Nav Bar in +1066px screens */
    openNav:function() {
        document.getElementById("sideNavBar").style.transition = "0.5s";  // when sizing, the transition will be 0s 
        document.getElementById("sideNavBar").style.width = "250px";
        document.getElementById("openArrow").style.transition = "0.5s";
        document.getElementById("openArrow").style.left = "-30px";
    },
  /* Close Nav Bar in +1066px screens */
    closeNav:function() {
        console.log("working");
        document.getElementById("sideNavBar").style.transition = "0.5s";
        document.getElementById("sideNavBar").style.width = "10px";
        document.getElementById("openArrow").style.transition = "0.5s";
        document.getElementById("openArrow").style.left = "20px";
    },
    expand:function(){
      document.getElementById("sideNavBar").classList.toggle("expand");
      document.getElementById("sideNavBar").style.width = "250px";
    }
  }

  function navListener(){
    var w = document.documentElement.clientWidth;    // Get width
    document.getElementById("sideNavBar").style.transition = "0s"; // Avoid laout alterations due to animation during resize 
    if(w < 1066){ // If width below max nav dimensions, set it to 100%
      document.getElementById("sideNavBar").style.width = "0px";
    }else{
      document.getElementById("sideNavBar").style.width = "250px";
      document.getElementById("openArrow").style.left = "-30px";
    }
}

window.addEventListener("resize", navListener);