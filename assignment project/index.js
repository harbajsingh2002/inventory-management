// if (localStorage.getItem('isLoggedIn')) {
//     window.location.href ="pages/homePage.html";
    
// }
// Function to hash the password using a simple hashing algorithm
function hashPassword(password) {
    let hash = 0;
    if (password.length == 0) return hash;
    for (let i = 0; i < password.length; i++) {
        let char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


// Event listener for the login form

let loginForm =  document.getElementById("loginForm");
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    login();
})


// Function to handle login   

function login() {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123"; 

    const email = document.getElementById('lemail').value;
    const password = document.getElementById("lpsw").value;

    if (email == adminEmail && password == adminPassword) { 
        const hashedPassword = hashPassword(password);
        // Store hashed password and other login details in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUserEmail", email); 
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("adminHashedPassword", hashedPassword);
        
        // Redirect to homePage.html
        window.location.href = 'pages/homePage.html'
        } else {
        alert("Invalid email or password. Please try again.");
    }
}
