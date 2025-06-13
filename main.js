import {LoginPage} from "./authentication/loginComponent.js";
import {DashboardComponet} from "./Dashboard/dashboardPage.js";
//import {fetchUserProfile} from "./query/userdetail.js";

// Global function to show dashboard (called from login script)
window.showDashboard=async function() {
    const app = document.querySelector(".app");
    
    let loginstyle=document.getElementById("loginStyle");
    if (loginstyle) loginstyle.remove();
    
    let loginscript=document.getElementById("loginScript");
    if (loginscript) loginscript.remove();
    
    // Replace content with dashboard
    app.innerHTML = DashboardComponet();

// let v=await fetchUserProfile()
//  console.log(v)


    // Load dashboard CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "./Dashboard/dashboardStyle.css";
    cssLink.id = "dashboardCSS";
    document.head.appendChild(cssLink);

    // Load dashboard script
    const script = document.createElement('script');
    script.src = './Dashboard/dashboardScript.js';
    script.id = "dashboardScript";
    document.head.appendChild(script);
};


window.showLogin=function() {
    const app = document.querySelector(".app");
    
    
    let dashboardStyle=document.getElementById("dashboardCSS");
    if (dashboardStyle) dashboardStyle.remove();
    
    let dashboardscript=document.getElementById("dashboardScript")
    if (dashboardscript) dashboardscript.remove();
    
    app.innerHTML = LoginPage();

    // Load dashboard CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "./authentication/loginStyle.css";
    cssLink.id = "loginStyle";
    document.head.appendChild(cssLink);



    // Load dashboard script
    const script = document.createElement('script');
    script.src = './authentication/loginscript.js';
    script.id = "loginScript";
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", async () => {
    const app = document.querySelector(".app");

    // Always show login page initially
    app.innerHTML = LoginPage();

    // Load login script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './authentication/loginscript.js';
    script.id="loginScript"
    document.head.appendChild(script);
});