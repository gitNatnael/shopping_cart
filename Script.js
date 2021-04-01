  //you should to implement a function which remove items from the carts
  
  let itemsData =[];
  async function getItems(){
      const res=await fetch("https://webacademy.se/fakestore/");
      const items=res.json();
      return items;
  }

  getItems().then(data=>{
     itemsData=data;
    data.forEach(function (product) {
        if(  document.getElementById('output')) {
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
    for(let i=0; i<carts.length; i++){
        carts[i].addEventListener('click', ()=>{
               cartNumber();
            })
       }
});
function cartNumber() {
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);
    localStorage.setItem('cartNumber', productNumbers + 1);
    document.querySelector('.cart span').textContent=productNumbers + 1;
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    } else localStorage.setItem('cartNumber',{});
}
function validate() {
        var fname=document.forms['orderForm']['firstName']
        if(fname.value == ''){
            document.getElementById('message').innerHTML = '<div class="error"> <p> Please enter your first name.</p></div>';
            return false; 
        }
        else {
            localStorage.setItem('cartNumber',0);
           document.querySelector('.cart span').textContent=0;
           return true;
        }
  
}

function getCart(){
   let productNumbers = localStorage.getItem('cartNumber');
   if(parseInt(productNumbers) >0)
    window.location.href="cart.html";
}
onLoadCartNumbers();
