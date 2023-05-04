

// window.onload = function () { 
//   alert("hello");
  


// }

const mobile_nav = document.querySelector(".mobile-icon");

const nav_header = document.querySelector(".header");

const brand_name = document.querySelector(".brand_name");

const collectionHead = document.querySelector(".collectionHeading");


const toggleNavbar = () => {
    nav_header.classList.toggle("active");
   
    brand_name.classList.toggle("hide");
    
 };

//  for hide the collection heading when navbar show 
const toggleheading = () => {
    collectionHead.classList.toggle("hideheading");
 };

mobile_nav.addEventListener("click", () => toggleNavbar());
mobile_nav.addEventListener("click", () => toggleheading());




/*
//===================collection js  Category Js

// Get the container element
var btnContainer = document.getElementsByClassName("categories")[0];

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("category");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("activeCategory");
    current[0].className = current[0].classList.remove(" activeCategory");
    // this.className += " activeCategory";
    this.classList.add(" activeCategory");
  });
}

// Add to cart
const cartIcon = document.querySelector(".cartIcon");
const wholeCart=document.querySelector(".cart-box");
cartIcon.addEventListener('click',()=>{
    if(wholeCart.classList.contains('hide')){
        wholeCart.classList.remove('hide');
    }
    else{
        wholeCart.classList.add('hide');

    }
});


*/