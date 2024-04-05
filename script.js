let products = [];
const cardsBlock = document.querySelector('.product__item-blocks');
const loading = document.querySelector('[data-type="loading"]');




function showLoader() {
    loading.style.display = 'flex';
}

function hideLoader() {
    loading.style.display = 'none';
}


let count = 5;

function counter() { 
    count += 5;
    getCard()
}

async function getCard() {
    const url = 'https://api.escuelajs.co/api/v1/products';
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
    });
    try {
        showLoader();
        products = await response.json();
        createCard(products);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
}

function createCard(cards) {
    cards.map((el) => {

            const basket = getBasketLocalStorage();
            checkingActiveButtons(basket);
            const maxDescription = 35;
            const world = el.description.split('');
            el.description = world.length > maxDescription
                ? `${world.slice(0, maxDescription).join('')}... <span class="read-more">Read More</span>`
                : el.description;


            function renderCart() {
                const {id, title, description, price} = el;
                
                return `<div class="item-product-item data-id="${id}">
                <div class="product-item-item__header">
                    <img src="img/1.jpeg" class="header__img" alt="product icon" width="100%" height="330">
                </div>
                <div class="header__about">
                        <h2 class="header__product-name cards-title">${title}</h2>
                        <div class="about__p">${description}</div>
                </div>    
                    <div class="price-button">
                        <div class="price__block">
                            <span class="price__text">Price</span>
                            <span class="price__number">$ ${price}</span>
                        </div>    
                        <button class="add-to-cart" data-id="${id}">Add To Cart</button>
                    </div>    
            </div>`
            }

            cardsBlock.insertAdjacentHTML('beforeend', renderCart());

        })
    };


document.addEventListener('DOMContentLoaded', getCard());
cardsBlock.addEventListener('click', handleCardClick);

function setBasketLocalStorage(basket) {
    const basketCount = document.querySelector('.basket__count');
    localStorage.setItem('basket', JSON.stringify(basket));
    basketCount.textContent = basket.length;
}

function getBasketLocalStorage() {
    const cartDataJSON = localStorage.getItem('basket');
    return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

function handleCardClick(event) {
    const targetButton = event.target.closest('.add-to-cart');

    if (!targetButton) return;

    const id = targetButton.dataset.id;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;

    basket.push(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}

function checkingActiveButtons(basket) {
    const button = document.querySelectorAll('.add-to-cart');

    button.forEach(btn =>  {
        const card  = btn.closest('.add-to-cart');
        const id = card.dataset.id;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? 'In Basket' : 'Add To Cart';
    })
}





// let obj = []
// function localStr(id) {
//     const uniqueArray = [...new Set(obj)];
//     obj.push(id)
//     localStorage.setItem('product', JSON.stringify(uniqueArray))

//     JSON.parse(localStorage.getItem('product'));


//     let t = ex.includes(id)

//     console.log(t ,  ex.slice([t]))

//     const index = ex.indexOf(id);
// if (index > -1) { // only splice array when item is found
//   ex.splice(index, 1); // 2nd parameter means remove one item only
// }




//    if (ex.includes(id)) {

//     let t = ex.slice(id)
    
//      console.log( t)
//    }


    
