import {LoginPage} from "./authentication/loginComponent.js"
import { authentication } from "./authentication/loginscript.js"
import { DashboardComponet } from "./Dashboard/dashboardPage.js"

document.addEventListener("DOMContentLoaded", async () => {
    var app = document.querySelector(".app")

    if (!authentication){
        app.innerHTML = LoginPage()

        // Now dynamically load the login script after the DOM is ready
        let myscript=document.getElementById("dynamicscript");
        if(myscript)myscript.remove();


        const script = document.createElement('script')
        script.type = 'module'
        script.id="dynamicscript"
        script.src = './authentication/loginscript.js'
        document.head.appendChild(script)
        return
    }else{
        app.innerHTML=DashboardComponet()
    }
  
})