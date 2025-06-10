import {Authentication} from "./authentication/loginscript"
import {LoginPage}      from "./authentication/loginComponent"


document.addEventListener("DOMContentLoaded",async () => {
    var app=document.querySelector(".app")
 
    if (!Authentication){
        app.innerHTML=LoginPage()
    }



    
 })