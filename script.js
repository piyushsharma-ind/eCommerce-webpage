document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    function addToCart(product) {
        cart.push(product);
        updateCartCount();
    }

    function updateCartCount() {
        document.getElementById('cartCount').innerText = cart.length;
    }

    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const product = {
                title: productElement.getAttribute('data-name'),
                price: productElement.getAttribute('data-price').replace('₹', ''),
                image: productElement.querySelector('img').src
            };
            addToCart(product);
        });
    });

    const modal = document.getElementById("cartModal");
    const btn = document.getElementById("cartButton");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        updateCartDisplay();
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById("cartItems");
        cartItemsContainer.innerHTML = "";
        const emptyMessage = document.getElementById("emptyMessage");

        if (cart.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto; margin-right: 10px;">
                    <span>${item.title} - ₹${item.price}</span>
                    <button class="removeFromCart" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            document.querySelectorAll('.removeFromCart').forEach(button => {
                button.addEventListener('click', function() {
                    removeFromCart(this.getAttribute('data-index'));
                });
            });
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
    }

    document.getElementById("buyButton").addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            document.getElementById('thankYouModal').style.display = 'block';
            cart = [];
            updateCartCount();
            updateCartDisplay();
            modal.style.display = "none";
        }
    });

    let currentIndex = 0;
    const images = document.querySelectorAll('.slideshow img');
    const totalImages = images.length;

    function showNextImage() {
        images[currentIndex].classList.remove('visible');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('visible');
        document.querySelector('.slideshow').style.transform = `translateX(-${currentIndex * (100 / totalImages)}%)`;
    }

    images[currentIndex].classList.add('visible');
    setInterval(showNextImage, 3000);
});