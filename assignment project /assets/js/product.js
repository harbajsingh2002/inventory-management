
document.addEventListener('DOMContentLoaded', () => {
    initializeLogoutButton();
    populateCategoryDropdown();
    initializeProductForm();
});


function initializeLogoutButton() {
    const logoutButton = document.getElementById("Logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }
}
// logout
function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}

// get the category
function categoryDropdown() {
    const categoryNameDropdown = document.getElementById('category');
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categoryNameDropdown.appendChild(option);
    });
}
// initilizing product form

function initializeProductForm() {
    const productForm = document.getElementById('productForm');

    if (productForm) {
        productForm.addEventListener('submit', handleProductFormSubmit);
    }
}
// submit product form
function productFormSubmit(event) {
    event.preventDefault();

    const formData = getProductFormData();
    if (!validateFormData(formData)) return;

    saveProduct(formData);
    productForm.reset();
    window.location.href = "homePage.html";
}

// save product

function getProductFormData() {
    return {
        name: document.getElementById('productName').value.trim(),
        description: document.getElementById('description').value.trim(),
        quantity: document.getElementById('quantity').value.trim(),
        price: document.getElementById('price').value.trim(),
        sku: document.getElementById('suk').value.trim(),
        category: document.getElementById('category').value
    };
}

// validate product form data

function validateFormData({ name, description, quantity, price, sku, category }) {
    let isValid = true;

    if (!name) {
        setError('span1', "Please enter the product name.");
        isValid = false;
    } else {
        setError('span1', "");
    }

    if (!category) {
        setError('span2', "Please select a category.");
        isValid = false;
    } else {
        setError('span2', "");
    }

    if (!description) {
        setError('span3', "Please enter the product description.");
        isValid = false;
    } else {
        setError('span3', "");
    }

    if (!quantity) {
        setError('span4', "Please enter the product quantity.");
        isValid = false;
    } else {
        setError('span4', "");
    }

    if (!price) {
        setError('span5', "Please enter the product price.");
        isValid = false;
    } else {
        setError('span5', "");
    }

    if (!sku) {
        setError('span6', "Please enter the product SKU.");
        isValid = false;
    } else {
        setError('span6', "");
    }

    return isValid;
}

// set error message

function setError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

// save product

function saveProduct({ name, description, price, sku, category, quantity }) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, description, price, sku, category, quantity });
    localStorage.setItem('products', JSON.stringify(products));
}
