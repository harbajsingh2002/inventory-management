if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = "../index.html";
    location.reload();
}

// Handle logout
let logoutButton = document.getElementById("Logout");
if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "../index.html";
    });
}


document.getElementById("categoryForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    let categoryName = document.getElementById("categoryName").value;
    if (categoryName =="") {
        // alert("Please enter the product name.");
        document.getElementById("spa1").innerHTML = "Please enter the product category name.";
        return false
    }
    else{
        document.getElementById("spa1").innerHTML = "";
    }
    let  categoryDescription = document.getElementById("categoryDescription").value;
    if (categoryDescription =="") {
        // alert("Please enter the product name.");
        document.getElementById("spa2").innerHTML = "Please enter the product category discription.";
        return false
    }
    else{
        document.getElementById("spa2").innerHTML = "";
    }
    // Create a category object
     let  category = {
        name: categoryName,
        description: categoryDescription
    };

    // Retrieve existing categories from local storage
    let  existingCategories = JSON.parse(localStorage.getItem("categories")) || [];

    // Add the new category to the existing categories array
    existingCategories.push(category);

    // Store the updated categories array in local storage
    localStorage.setItem("categories", JSON.stringify(existingCategories));

    // Reset form
    document.getElementById("categoryForm").reset();

    // Optionally, you can display a message to indicate successful addition of category
    alert("Category added successfully!");
    window.location.href = "product.html";
});
