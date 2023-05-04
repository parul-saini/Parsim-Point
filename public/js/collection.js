

class cartItem {
    constructor(title, img, price) {
        this.title = title
        this.img = img
        this.price = price
        this.quantity = 1
    }
}

class localcart {
    static key = 'cartItems';

    static getLocalcartItems() {
        let cartmap = new Map();
        const cart = localStorage.getItem(localcart.key);
        if (cart === null || cart.length === 0) {
            return cartmap;
        }
        // convrt into the array of array
       
        return new Map(Object.entries(JSON.parse(cart)));
    }
    static addItemToLocalCart(id, item) {
        let cart = localcart.getLocalcartItems();
        if(cart.has(id)) {
            let mapitem = cart.get(id);
            mapitem.quantity += 1;
            cart.set(id, mapitem);
        } else 
            cart.set(id, item);
            localStorage.setItem(localcart.key, JSON.stringify(Object.fromEntries(cart)));
            updateCartUI();
        
    }
    static removeItemFromCart(id) {
        let cart = localcart.getLocalcartItems();
        if (cart.has(id)) {
            let mapitem = cart.get(id);
            if (mapitem.quantity > 1) {
                mapitem.quantity -= 1;
                cart.set(id, mapitem);
            } else {
                cart.delete(id);
            }

        }
        if (cart.length ===0)
            localStorage.clear();
        else {
            localStorage.setItem(localcart.key, JSON.stringify(Object.fromEntries(cart)));
            updateCartUI();
        }
    }
}


// fetch the add to cart btn

let addtocartBtn = document.querySelectorAll(".addTo_cart")

addtocartBtn.forEach((btn) => {

    btn.addEventListener("click", (e) => {
        let id = e.target.parentElement.parentElement.getAttribute("dataId");
        let img = e.target.parentElement.previousElementSibling.firstElementChild.src;
        let title = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        let price = e.target.previousElementSibling.textContent;

        const item = new cartItem(title, img, price);
        localcart.addItemToLocalCart(id,item);
    })
})


function updateCartUI() {
    let cartempty=localStorage.getItem(localcart.key);
    if( cartempty =='{}'){
        const cartempty= document.querySelector(".cartempty");
        cartempty.innerHTML=` <h1>Your cart is empty:(</h1>
        <div id="cartlady">

        <img src="images/cartlady.png" alt="Empty cart">
         </div>`;
    }
    
    const dresslist= document.querySelector(".dressList");
    dresslist.innerHTML="";
    const items = localcart.getLocalcartItems();
    if (items === null) return;
    let count = 0; //count all items in map
    let total = 0; //to add prices of all items
    for(const [key, value] of items.entries()) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('items');
        let price=(value.price * value.quantity);
         count+=1;
        total+=price;
        cartItem.innerHTML = `
                        <div class="Item">
                            <img src="${value.img}" alt="cart summary">
                        </div>
                        <div class="dress_name">
                           <p>${value.title}</p>

                        </div>
                        <div class="price">
                            <p>Quantity: ${value.quantity}pcs</p>
                           <p style="font-family: cursive;">&#x20B9;${price}</p>
                        </div>
                           
                        <div class="dltbtn">
                            <button type="button">DELETE</button>
                        </div>
                        `
        
       //to delete the item  
       cartItem.lastElementChild.addEventListener('click',()=>{
        localcart.removeItemFromCart(key);
       
       })
       dresslist.append(cartItem);
    }

}
document.addEventListener('DOMContentLoaded',()=>{updateCartUI()});





