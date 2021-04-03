let products=[];
async function getItems() {
    const res = await fetch("https://webacademy.se/fakestore/");
    const items = res.json();
    return items;
}

getItems().then(data => {
    products = data;
    data.forEach(function (product) {
        if (document.getElementById('output')) {
            document.getElementById('output').innerHTML += `
              <div class = "product">
              <h3>${product.title}</h3>
              <p class="description">${product.description}</p>
              <p><img src ="${product.image}" alt="Image" width="250" height="250"/></p>
              <p>Price:${product.price}</p> 
              <button  type="btn" class ='add-cart'   
                       value=${product.id} >Add to cart</button>            
              </div>`
                ;
        }
    });
    let carts = document.querySelectorAll('.add-cart');
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
         let getLocalStorageItemsId=localStorage.getItem('itemsId');
        if(getLocalStorageItemsId) {
            localStorage.setItem('itemsId',getLocalStorageItemsId + ',' + carts[i].value);
        } 
        else localStorage.setItem('itemsId', carts[i].value);
            cartNumber();
        });
    }
});

function cartNumber() {
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);
    localStorage.setItem('cartNumber', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
}

function onLoadCartNumbers() {
   if(document.getElementById('cart-section')) document.getElementById('cart-section').style.display= 'none';
   if(document.getElementById('confirmation')) document.getElementById('confirmation').style.display= 'none';
   let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    } else localStorage.setItem('cartNumber', 0);

}
function validate() {
    var fname = document.forms['orderForm']['firstName']
    var lname = document.forms['orderForm']['lastName']
    var telNo = document.forms['orderForm']['telNumber']
    var eMail = document.forms['orderForm']['email']
    var adrs = document.forms['orderForm']['adress']

    if (fname.value == '') {
        document.getElementById('message').innerHTML = '<div class="error"> <p> Please enter your first name.</p></div>';
        return false;
    }
    else if (lname.value == '') {
        document.getElementById('message').innerHTML = '<div class="error"> <p> Please enter your last name.</p></div>';
        return false;
    }
    else if (telNo.value == '') {
        document.getElementById('message').innerHTML = '<div class="error"> <p> Please enter your telephone number.</p></div>';
        return false;
    }
    else if (eMail.value == '') {
        document.getElementById('message').innerHTML = '<div class="error"> <p> Please enter your e-mail.</p></div>';
        return false;
    }
    else if (adrs.value == '') {
        document.getElementById('message').innerHTML = '<div class="error"> <p> Please enter your delivery adress.</p></div>';
        return false;
    }
    else {
        localStorage.setItem('cartNumber', 0);
        localStorage.removeItem('itemsId');
        document.querySelector('.cart span').textContent = 0;
       /*  document.getElementById('cart-section').style.display= 'none';
        document.getElementById('output').style.display= 'none'; 
        document.getElementById('confirmation').style.display= 'block'; */
        //document.getElementById('cartList').innerHTML= '<h1> Final Result !!! </h1><br>';
        return true;
    }
}
let itemsInShoppingCart=[];
let eachItem=[];
function getCart() {
    
    let productNumbers = localStorage.getItem('cartNumber');
    let itemIds= localStorage.getItem('itemsId')
    if(itemIds && parseInt(productNumbers) > 0) {
        document.getElementById('output').style.display= 'none';
        document.getElementById('cart-section').style.display= 'block';
       /*  itemIds.split(",").forEach(item=>{
        if(eachItem[item]){
            eachItem[item]++;
         }else{
            eachItem[item] = 1;
         }
        });
        let ids= Object.keys(eachItem); */
        itemIds.split(",").forEach(d=> {
            let item=products.find(p=> p.id == parseInt(d))
            if(item) itemsInShoppingCart.push(item);
          }); 
         
         itemsInShoppingCart.forEach(function (item) {
            document.getElementById('cartList').innerHTML += `
            <div class = "cart-order" id="${item.id}">
            <h3>${item.title}</h3>
            <p><img src ="${item.image}" alt="Image" width="100" height="100"/></p>
            <p>Price:${item.price}</p> 
            <button  type="btn" class ='add-cart'   
                    onclick="removeCart(${item.id})"   value=${item.id} >Remove</button>            
            </div>`;
        });  
        let totalPrice=0;
        itemsInShoppingCart.forEach(function (item) {
              totalPrice+= item.price
        });
        document.getElementById('total-price').innerHTML =  `<p> Total price is: ${totalPrice} </p>`;
    }
}
 
/* 
 function changeItem(inputId, currentItemAmount){
    let el=document.getElementById(inputId).getElementsByClassName("item-amount")[0];
    if(currentItemAmount == eachItem=[inputId] ) console.log('no change');
    else console.log();
    el.addEventListener('change', updateValue);
   
}
function updateValue(e) {
   console.log(e.target.value);
  } */
/* let carts = document.querySelectorAll('.cart-order');
console.log(carts); */
function removeCart(id) {
     let el=document.getElementById(id);
     el.remove();
     let itemIds= localStorage.getItem('itemsId');
     itemIds=itemIds.split(",");
     let index=itemIds.indexOf(id);
     itemIds.splice(index,1);
     document.querySelector('.cart span').textContent = itemIds.length;
     localStorage.setItem('itemsId',itemIds.toString());
     localStorage.setItem('cartNumber', itemIds.length);
}
onLoadCartNumbers();
