
// Simulated correct credentials
const correctCredentials = {
    username: 'demo',
    password: 'password123'
};

const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Reset previous error states
    passwordInput.classList.remove('error');
    usernameInput.classList.remove('error');
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
    
       let jwttoken=await  Jwt(username,password)
       if (jwttoken.error){
        usernameInput.classList.add('error');
        passwordInput.classList.add('error');
        errorMessage.textContent = 'Incorrect password or username. Please try again.';
        
        errorMessage.classList.add('show');
        
        // Clear error after 3 seconds
        setTimeout(() => {
            passwordInput.classList.remove('error');
            usernameInput.classList.remove('error');
            errorMessage.classList.remove('show');
        }, 3000);
        return
       }
   
        successMessage.classList.add('show');
        setTimeout(() => {
            alert('Login successful! In a real application, you would be redirected to your dashboard.');
        }, 1000);
   
});

// Clear error when user starts typing
passwordInput.addEventListener('input', function() {
    if (passwordInput.classList.contains('error')) {
        passwordInput.classList.remove('error');
        errorMessage.classList.remove('show');
    }
});

usernameInput.addEventListener('input', function() {
    if (usernameInput.classList.contains('error')) {
        usernameInput.classList.remove('error');
        errorMessage.classList.remove('show');
    }
});


// Add some interactive effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});



async function Jwt(username,password){
    var base64string=(()=>{
        return btoa(`${username}:${password}`)
    })(username,password)

    const response=await fetch("https://learn.zone01kisumu.ke/api/auth/signin",{
          method:"POST",
          headers:{
            'Authorization': 'Basic ' + base64string,
            'Content-Type': 'application/json'
          }
    })
   // if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    console.log(data)
    return data
}

