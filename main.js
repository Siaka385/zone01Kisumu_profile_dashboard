import {LoginPage} from "./authentication/loginComponent.js";
import {DashboardComponet} from "./Dashboard/dashboardPage.js";

// Global function to show dashboard (called from login script)
window.showDashboard = function() {
    const app = document.querySelector(".app");

    // Replace content with dashboard
    app.innerHTML = DashboardComponet();

let loginstyle=document.getElementById("loginStyle");
if (loginstyle) loginstyle.remove();



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

document.addEventListener("DOMContentLoaded", async () => {
    const app = document.querySelector(".app");

    // Always show login page initially
    app.innerHTML = LoginPage();

    // Load login script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = './authentication/loginscript.js';
    document.head.appendChild(script);
});