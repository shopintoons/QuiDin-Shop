// Liste des produits (À modifier selon vos vrais articles)
const products = [
    {
        id: 1,
        name: "tapis de priere interactif",
        price: 24.99,
        image: "images/tapis de priere interactif.png"
    },
    {
        id: 2,
        name: "Chapelet / Tasbih en Bois Noble",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400"
    },
    {
        id: 3,
        name: "Jeu de Cartes Quiz Islamique",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400"
    },
    {
        id: 4,
        name: "Support de Coran en Bois Sculpté",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400"
    }
];

let cart = [];

// Afficher les produits au chargement
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)} €</p>
                <button class="btn-add" onclick="addToCart(${product.id})">Ajouter au panier</button>
            </div>
        `;
        productList.appendChild(card);
    });
});

// Ajouter un article au panier
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

// Mettre à jour l'interface du panier
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span><strong>${item.price.toFixed(2)} €</strong></span>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }
    
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Gestion de l'affichage de la fenêtre panier
const modal = document.getElementById('cart-modal');
const cartIcon = document.querySelector('.cart-icon');
const closeBtn = document.querySelector('.close-btn');

cartIcon.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Envoi de la commande via WhatsApp
function checkout() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }
    
    let message = "Bonjour QuizDin ! Je souhaite commander :\n";
    cart.forEach(item => {
        message += `- ${item.name} (${item.price.toFixed(2)} €)\n`;
    });
    const total = document.getElementById('cart-total').innerText;
    message += `\nTotal: ${total} €`;

    // Mettre votre numéro de téléphone à la place de 33600000000
    const phoneNumber = "33600000000";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}
