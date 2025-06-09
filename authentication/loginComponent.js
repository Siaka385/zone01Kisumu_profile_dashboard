export function LoginPage(){

    return `<div class="container">
            <h1>Welcome! Check Your Progress</h1>
            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Name</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                    <div class="error-message" id="errorMessage">
                        Incorrect password. Please try again.
                    </div>
                </div>
                <button type="submit" class="login-btn">Login</button>
                <div class="success-message" id="successMessage">
                    Welcome back! Redirecting to your progress dashboard...
                </div>
            </form>`

}