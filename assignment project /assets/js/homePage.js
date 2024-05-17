// // Check if user is logged in
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = "../index.html";
    
}

//  logout
let logoutButton = document.getElementById("Logout");
if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "../index.html";
    });
}

//  navigate to product category creation

let ProductCategory = document.getElementById("createProductCategory");
if (ProductCategory) {
    ProductCategory.addEventListener("click", function () {
        window.location.href = "./category.html";
    });
}

// navigate to product creation

let createProduct = document.getElementById("createProduct");
if (createProduct) {
    createProduct.addEventListener("click", function () {
        window.location.href = "./product.html";
    });
}



// Function to display products in table

function displayProducts(products = []) {
    const productList = document.getElementById("productList");
    if (!productList) return;

    productList.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td><button class="add-to-cart-btn" data-index="${index}">Add to Cart</button></td>
            
        `;
        productList.appendChild(row);
    });
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}



// Function to filter products by name and price range

function filterProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Number.MAX_SAFE_INTEGER;

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchInput) &&
            product.price >= minPrice && product.price <= maxPrice;
    });

    displayProducts(filteredProducts);
}



//  adding a product to the cart


function handleAddToCart(event) {
    const button = event.target;
    const index = button.getAttribute('data-index');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products[index].quantity > 0) {
        products[index].quantity--;

        if (products[index].quantity < 3) {
            alert(`Low stock level for ${products[index].name}`);
        }

        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(products);
    } else {
        alert(`Product ${products[index].name} is out of stock!`);
    }
}


// Function to display product categories and their product count

function displayCategories() {
    const categoryList = document.getElementById("categoryList");
    if (!categoryList) return;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    const categoryCount = categories.map(category => {
        return {
            name: category.name,
            productCount: products.filter(product => product.category === category.name).length
        };
    });
    categoryList.innerHTML = '';
    categoryCount.forEach(category => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category.name}</td>
            <td>${category.productCount}</td>
        `;
        categoryList.appendChild(row);
    });
}



// Event listeners

document.addEventListener("DOMContentLoaded", () => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    displayProducts(products);
    displayCategories();
});
let filterBtn = document.getElementById("filterBtn");
if (filterBtn) {
    filterBtn.addEventListener("click", filterProducts);
}
