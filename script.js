// Array de produtos
const products = [
    { id: 1, name: 'Tênis Exemplo', price: 200, imageUrl: 'tenis-exemplo.jpg' } // Produto de exemplo
];

let isAdmin = false; // Controle de administrador
let cart = [];

// Função para autenticar o usuário e verificar se é admin
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    
    if (email === 'pietrobolzan2007@gmail.com') {
        isAdmin = true;
        alert('Bem-vindo, administrador!');
        document.querySelector('.admin-panel').style.display = 'block'; // Exibe a interface de admin
    } else {
        isAdmin = false;
        alert('Bem-vindo, usuário!');
        document.querySelector('.admin-panel').style.display = 'none'; // Esconde a interface de admin
    }

    displayProducts();
});

// Função para exibir produtos no catálogo
function displayProducts() {
    const productList = document.getElementById('catalog');
    productList.innerHTML = ''; // Limpa o catálogo

    if (!isAdmin) {
        // Usuário comum - mostrar apenas o produto de exemplo
        const product = products[0];
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Preço: R$ ${product.price}</p>
            <img src="${product.imageUrl}" width="100" height="100">
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            <button onclick="addToFavorites(${product.id})">Favoritar</button>
        `;
        productList.appendChild(productItem);
    } else {
        // Admin - mostrar todos os produtos
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Preço: R$ ${product.price}</p>
                <img src="${product.imageUrl}" width="100" height="100">
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                <button onclick="addToFavorites(${product.id})">Favoritar</button>
            `;
            productList.appendChild(productItem);
        });
    }
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpa o carrinho

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - R$ ${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Função para finalizar compra
function finalizePurchase() {
    alert('Compra finalizada!');
    cart = []; // Limpa o carrinho após a compra
    updateCart();
}

// Função para adicionar aos favoritos
function addToFavorites(productId) {
    const product = products.find(p => p.id === productId);
    const favoriteItems = document.getElementById('favorite-items');
    const favoriteItem = document.createElement('div');
    favoriteItem.innerHTML = `
        <p>${product.name} - R$ ${product.price}</p>
    `;
    favoriteItems.appendChild(favoriteItem);
    alert('Produto adicionado aos favoritos!');
}

// Adicionar novos produtos ao catálogo (Apenas Admin)
document.getElementById('add-product-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    if (isAdmin) {
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const imageUrl = document.getElementById('product-image').value;

        const product = {
            id: products.length + 1,
            name,
            price,
            imageUrl
        };

        products.push(product);
        displayProducts();
        alert('Produto adicionado com sucesso!');
    } else {
        alert('Acesso negado!');
    }
});

// Inicializa o site
window.onload = function() {
    document.querySelector('.admin-panel').style.display = 'none'; // Esconde a interface de admin inicialmente
    displayProducts(); // Mostra o catálogo com base no status de admin
};
// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert('Produto adicionado ao carrinho!');
}

// Função para exibir o carrinho no meio da tela
function showCartBox() {
    const cartBox = document.getElementById('cart-box');
    const cartItems = document.getElementById('cart-items');
    
    cartItems.innerHTML = ''; // Limpa os itens do carrinho
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - R$ ${item.price}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartBox.style.display = 'flex'; // Mostra a caixa do carrinho
}

// Função para fechar a caixa do carrinho
function closeCartBox() {
    document.getElementById('cart-box').style.display = 'none';
}

// Função para remover itens do carrinho
function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item pelo índice
    showCartBox(); // Atualiza a exibição do carrinho
}

// Função para finalizar compra e exibir o formulário de endereço
function finalizePurchase() {
    document.getElementById('cart-box').style.display = 'none'; // Fecha o carrinho
    document.getElementById('address-box').style.display = 'flex'; // Abre a caixa de endereço
}

// Função para fechar a caixa de endereço
function closeAddressBox() {
    document.getElementById('address-box').style.display = 'none';
}

// Função para confirmar a compra
document.getElementById('address-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const address = document.getElementById('address').value;
    
    if (address) {
        alert('Compra confirmada! Seu pedido será enviado para: ' + address);
        cart = []; // Limpa o carrinho após a compra
        closeAddressBox(); // Fecha a caixa de endereço
    }
});