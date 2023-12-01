let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let cartRectangle = document.querySelector(".cart-rectangle");
let closeCart = document.querySelector("#close-cart");

// Abrir o Carrinho
cartIcon.onclick = () => {
    cart.classList.add("active");
    cartRectangle.classList.add("active");
};

// Fechar o Carrinho
closeCart.onclick = () => {
    cart.classList.remove("active");
    cartRectangle.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    console.log('Page is ready!');

    // Adicione os produtos do carrinho ao DOM apenas se o usuário tiver interagido com a página
    if (localStorage.getItem('cart')) {
        const cartFromLocalStorage = getCartFromLocalStorage();
        displayCartItems(cartFromLocalStorage);
    }

    var removeCartButtons = document.getElementsByClassName("cart-remove")
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCartButtons = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Botão de Realizar a Compra
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];

    if (cartContent.children.length > 0) {
        // Armazenar temporariamente os produtos a serem removidos
        const productsToRemove = [];

        while (cartContent.hasChildNodes()) {
            const cartItem = cartContent.firstChild;
            const productName = cartItem.querySelector(".cart-product-title").innerText;
            productsToRemove.push(productName);
            cartContent.removeChild(cartItem);
        }

        // Remover produtos do LocalStorage imediatamente
        productsToRemove.forEach(productName => {
            removeProductFromLocalStorage(productName);
        });

        updatetotal();

        showPurchaseNotification();
    } else {
        showEmptyCartNotification();
    }
}

function removeProductsFromLocalStorageOnPageLoad() {
    const productsToRemoveJSON = sessionStorage.getItem('productsToRemove');
    if (productsToRemoveJSON) {
        const productsToRemove = JSON.parse(productsToRemoveJSON);
        productsToRemove.forEach(productName => {
            removeProductFromLocalStorage(productName);
        });
        sessionStorage.removeItem('productsToRemove');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    removeProductsFromLocalStorageOnPageLoad();
});


// Remover Produtos do Carrinho

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItem = buttonClicked.parentElement;

    var productName = cartItem.querySelector(".cart-product-title").innerText;

    cartItem.remove();

    updatetotal();

    removeProductFromLocalStorage(productName);

    showRemoveNotification(productName);
}

function removeProductFromLocalStorage(productName) {
    const currentCart = getCartFromLocalStorage();
    const updatedCart = currentCart.filter(product => product.title !== productName);
    updateCartInLocalStorage(updatedCart);
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}

// Adicionar ao Carrinho

function addCartClicked(event) {
    var button = event.target;

    var shopProducts = button.closest(".image-container");

    var title = shopProducts.querySelector(".product-title").innerText;
    var price = shopProducts.querySelector(".price").innerText;

    var productImgElement = shopProducts.querySelector(".product-img");

    var productImg = productImgElement.src;

    if (isProductInCart(title)) {
        produtoExistenteCarrinho(title);
    } else {
        addProductToCart(title, price, productImg);
        updatetotal();
        showNotification(title);
    }
}

function isProductInCart(title) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            return true;
        }
    }
    return false;
}

function updateCartInLocalStorage(cart) {
    console.log('Updating cart in LocalStorage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartFromLocalStorage() {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
        const decodedCart = JSON.parse(cartString);
        return decodedCart;
    }
    // Se o item 'cart' não estiver definido, retorne um array vazio
    return [];
}

function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    // Verifique se o produto já está no carrinho
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            produtoExistenteCarrinho(title);
            return;
        }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart -->
        <i class='bx bx-x cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);

    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);

    updatetotal();

    // Após adicionar um produto, atualize o carrinho no LocalStorage
    const currentCart = getCartFromLocalStorage();
    const updatedCart = [...currentCart, { title, price, productImg, quantity: 1 }];
    updateCartInLocalStorage(updatedCart);
}

function displayCartItems(cart) {
    const cartContent = document.getElementsByClassName("cart-content")[0];

    // Limpe o conteúdo atual do carrinho
    cartContent.innerHTML = '';

    // Use um conjunto (Set) para armazenar títulos únicos de produtos
    const uniqueProductTitles = new Set();

    // Adicione os produtos do carrinho ao DOM, evitando duplicatas
    cart.forEach(product => {
        // Verifique se o título do produto já foi adicionado
        if (!uniqueProductTitles.has(product.title)) {
            addProductToCart(
                product.title,
                product.price,
                product.productImg,
                product.quantity
            );

            // Adicione o título ao conjunto para evitar duplicatas
            uniqueProductTitles.add(product.title);
        }
    });

    // Atualize o total após adicionar os produtos ao DOM
    updatetotal();
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("R$ ", "").replace(",", "."));
        var quantity = quantityElement.value;

        if (!isNaN(price)) {
            total = total + price * quantity;
        }
    }

    if (!isNaN(total)) {
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "R$ " + total.toFixed(2);
    }
}

/* ___________________________________________________________________________________ */

/* Notificação de Adicionar o Produto ao Carrinho */

let notificationCounter = 0;
let images = {};

function preloadImages() {
    const imageUrls = [
        "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconCarrinho.png?raw=true",
        "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconComprar.png?raw=true",
        "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconRemoverCarrinho.png?raw=true",
        "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconAlert.png?raw=true"
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        images[url] = img;
    });
}

preloadImages();

function showNotification(productName) {
    var notification = document.querySelector(".notification");
    var notificationText = notification.querySelector(".notification-text span");
    var rectanglefundo = document.querySelector(".rectanglefundo");
    var rectanglefundoImage = rectanglefundo.querySelector("img");

    notificationCounter++;
    var currentNotification = notificationCounter;

    notificationText.innerHTML = `<strong>${productName}</strong> adicionado ao carrinho!`;
    notification.style.display = "flex";

    rectanglefundo.style.background = "#7188da";

    rectanglefundoImage.src = "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconCarrinho.png?raw=true";

    if (window.innerWidth < 600) {
        rectanglefundoImage.style.marginLeft = "16px";
    } else {
        rectanglefundoImage.style.marginLeft = "9px";
    }

    setTimeout(function () {
        if (currentNotification === notificationCounter) {
            notification.style.animation = "fadeOutDown 0.5s ease-out";
            notification.style.opacity = "0";

            setTimeout(function () {
                notification.style.display = "none";
                notification.style.opacity = "1";
                notification.style.animation = "";

                notification.classList.remove("fadeInWidth");
            }, 500);
        }
    }, 3000);
}

/* ___________________________________________________________________________________ */

/* Notificação de Comprar o Produto */

function showPurchaseNotification() {
    var notification = document.querySelector(".notification");
    var notificationText = notification.querySelector(".notification-text span");
    var rectanglefundo = document.querySelector(".rectanglefundo");
    var rectanglefundoImage = rectanglefundo.querySelector("img");

    notificationText.innerHTML = "Obrigado por escolher a Destiny Joias!";
    notification.style.display = "flex";

    rectanglefundo.style.background = "#72db7d";
    rectanglefundoImage.src = "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconComprar.png?raw=true";

    if (window.innerWidth < 600) {
        rectanglefundoImage.style.marginLeft = "17px";
    } else {
        rectanglefundoImage.style.marginLeft = "10px";

    }

    setTimeout(function () {
        notification.style.animation = "fadeOutDown 0.5s ease-out";
        notification.style.opacity = "0";

        setTimeout(function () {
            notification.style.display = "none";
            notification.style.opacity = "1";
            notification.style.animation = "";
        }, 500);
    }, 3000);
}

/* ___________________________________________________________________________________ */

/* Notificação de Verificar os Produtos no Carrinho */

function showEmptyCartNotification() {
    var notification = document.querySelector(".notification");
    var notificationText = notification.querySelector(".notification-text span");
    var rectanglefundo = document.querySelector(".rectanglefundo");
    var rectanglefundoImage = rectanglefundo.querySelector("img");

    notificationText.innerHTML = "O seu carrinho está vazio!";
    notification.style.display = "flex";

    rectanglefundo.style.background = "#f25c54";
    rectanglefundoImage.src = "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconRemoverCarrinho.png?raw=true";

    if (window.innerWidth < 600) {
        rectanglefundoImage.style.marginLeft = "18px";
        rectanglefundoImage.style.marginBottom = "3px";
    } else {
        rectanglefundoImage.style.marginLeft = "10px";
    }

    setTimeout(function () {
        notification.style.animation = "fadeOutDown 0.5s ease-out";
        notification.style.opacity = "0";

        setTimeout(function () {
            notification.style.display = "none";
            notification.style.opacity = "1";
            notification.style.animation = "";
        }, 500);
    }, 3000);
}

/* ___________________________________________________________________________________ */

/* Notificação de Produtos Que Estão no Carrinho */

function produtoExistenteCarrinho(productName) {
    var notification = document.querySelector(".notification");
    var notificationText = notification.querySelector(".notification-text span");
    var rectanglefundo = document.querySelector(".rectanglefundo");
    var rectanglefundoImage = rectanglefundo.querySelector("img");

    notificationCounter++;
    var currentNotification = notificationCounter;

    notificationText.innerHTML = `<strong>${productName}</strong> já está em seu carrinho!`;
    notification.style.display = "flex";

    rectanglefundo.style.background = "#f2d654";

    rectanglefundoImage.src = "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconAlert.png?raw=true";

    if (window.innerWidth < 600) {
        rectanglefundoImage.style.marginLeft = "17px";
        rectanglefundoImage.style.marginBottom = "3px";
    } else {
        rectanglefundoImage.style.marginLeft = "9px";
        rectanglefundoImage.style.marginBottom = "3px";
    }

    setTimeout(function () {
        if (currentNotification === notificationCounter) {
            notification.style.animation = "fadeOutDown 0.5s ease-out";
            notification.style.opacity = "0";

            setTimeout(function () {
                notification.style.display = "none";
                notification.style.opacity = "1";
                notification.style.animation = "";

                notification.classList.remove("fadeInWidth");
            }, 500);
        }
    }, 3000);
}

/* ___________________________________________________________________________________ */

/* Notificação de Remover Produtos do Carrinho */

function showRemoveNotification(productName, newImageSrc) {
    var notification = document.querySelector(".notification");
    var notificationText = notification.querySelector(".notification-text span");
    var rectanglefundo = document.querySelector(".rectanglefundo");
    var rectanglefundoImage = rectanglefundo.querySelector("img");

    notificationCounter++;
    var currentNotification = notificationCounter;

    notificationText.innerHTML = `<strong>${productName}</strong> removido do carrinho.`;
    notification.style.display = "flex";

    rectanglefundo.style.background = "#f25c54";

    rectanglefundoImage.src = "https://github.com/LeonardoSantos123/imagensdestinyjoias/blob/main/P%C3%A1gina%20de%20Produtos/Imagens/IconRemoverCarrinho.png?raw=true";

    if (window.innerWidth < 600) {
        rectanglefundoImage.style.marginLeft = "18px";
        rectanglefundoImage.style.marginBottom = "3px";
    } else {
        rectanglefundoImage.style.marginLeft = "10px";
    }

    setTimeout(function () {
        if (currentNotification === notificationCounter) {
            notification.style.animation = "fadeOutDown 0.5s ease-out";
            notification.style.opacity = "0";

            setTimeout(function () {
                notification.style.display = "none";
                notification.style.opacity = "1";
                notification.style.animation = "";

                notification.classList.remove("fadeInWidth");

                rectanglefundo.style.background = "";
            }, 500);
        }
    }, 3000);
}

/* ___________________________________________________________________________________ */

/* JavaScript das Opiniões dos Clientes */

$(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true
});
$(document).ready(function () {
    $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    });
});

/* ___________________________________________________________________________________ */

/* JavaScript dos Produtos */

document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".image-container");

    containers.forEach(function (container) {
        const addCartButton = container.querySelector(".add-cart");

        if (addCartButton) {
            const isMobile = window.matchMedia("(max-width: 750px)").matches;

            if (isMobile) {
                container.addEventListener("touchstart", function () {
                    container.querySelector(".container2").style.height = "200px";
                    addCartButton.style.opacity = "1";
                });

                container.addEventListener("touchend", function () {
                    addCartButton.style.opacity = "0";
                });
            } else {
                container.addEventListener("mouseenter", function () {
                    container.querySelector(".container2").style.height = "200px";
                    addCartButton.style.opacity = "1";
                });

                container.addEventListener("mouseleave", function (e) {
                    const container2 = container.querySelector(".container2");
                    if (container2 && !container2.contains(e.relatedTarget)) {
                        container2.style.height = "160px";
                        addCartButton.style.opacity = "0";
                    }
                });

                container.addEventListener("mouseenter", function () {
                    addCartButton.style.opacity = "1";
                });

                container.addEventListener("mouseleave", function () {
                    addCartButton.style.opacity = "0";
                });
            }

            addCartButton.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        }
    });
});

document.querySelectorAll('.add-cart').forEach(button => button.addEventListener('click', e => {
    if (!button.classList.contains('loading')) {

        button.classList.add('loading');

        setTimeout(() => button.classList.remove('loading'), 3700);

    }
    e.preventDefault();
}));
