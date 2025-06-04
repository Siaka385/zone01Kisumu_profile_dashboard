
import { renderlogin, rendersignup } from "./authentication/authenticationpage.js";
import { highlightActiveCategory, LoadDataFromServer, RenderDashboard, initTrendingToggle } from "./forumMainPage/Dashboard.js";
import { renderPrivateMsgPage } from "./messsages/privatemessage.js";
import { renderBadRequest, renderInternalServerError, renderNotAllowed, renderPageNotFound } from "./ErrorStatusCode/Error.js";
import { renderLogout } from "./authentication/logout.js";
import { connectWebSocket, updateNotificationBadge } from "./messsages/websocket.js";

window.onload = async () => {

    function loadScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.src = scriptUrl;
            script.defer = true;
            script.id = "dynamicScript";
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

var IswebsocketStarted=false
    async function checkSession(cat) {
        try {
            let response = await fetch("/check-auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ router: cat })
            });

            let text = await response.json();

            if(text.response === "Status 500:Internal Server error"){
                location.href="/internalservererror"
                return false;
            }

            if (text.response === "User is Authenticated") {
                return true;
            }
        } catch (error) {
            console.error("Error checking session:", error);
            location.href="/internalservererror"
        }
        return false;
    }
    const routes = {
        "/": {
            render: renderlogin,
            script: "../js/authentication/login.js",
            css: "../styles/signup.css"
        },
        "/signup": {
            render: rendersignup,
            script: "../js/authentication/signup.js",
            css: "../styles/signup.css"
        },
        "/logout": {
            render: renderLogout,
            script: null,
            css: null,
        },
        "/Dashboard": {
            render: RenderDashboard,
            script: "../js/forumMainPage/registeredUser.js",
            css: ["../styles/registeredUser.css", "../styles/trending-toggle.css"]
        },
        "/privatemessages": {
            render: renderPrivateMsgPage,
            script: "../js/messsages/message.js",
            css: "../styles/message.css"
        },
        "/notfound": {
            render: renderPageNotFound,
            script: "../js/ErrorStatusCode/NotFoundStatusCode.js",
            css: "../styles/Errorpage.css"
        },
        "/accessnotallowed": {
            render: renderNotAllowed,
            script: "../js/ErrorStatusCode/AccessForbiddenStatusCode.js",
            css: "../styles/Errorpage.css"
        },
        "/internalservererror": {
            render: renderInternalServerError,
            script: "../js/ErrorStatusCode/InternalServerErrorStatusCode.js",
            css: "../styles/Errorpage.css"
        },
        "/badrequest": {
            render: renderBadRequest,
            script: "../js/ErrorStatusCode/BadRequestStatusCode.js",
            css: "../styles/Errorpage.css"
        }
    };


    function navigate(path) {
        if (window.location.pathname === "/") {
            history.pushState(null, "", "/Dashboard");
        } else {
            history.pushState({}, "", path);
        }


        renderPage();
    }

    async function renderPage() {
        let path = window.location.pathname;
        let container = document.querySelector(".container");
        let app = document.querySelector(".app");
        let chatcontainer = document.querySelector(".chat-container")

        if (routes[path]) {

            let isAuthenticated = await checkSession(path);
            if (!isAuthenticated) {
                if (path === "/" || path === "/signup") {
                    window.location.href = "/Dashboard";
                } else {
                    window.location.href = "/"
                }
                return;
            }
            if (path.startsWith("/Dashboard")) {
                         
                     if(!IswebsocketStarted){
                    
                        connectWebSocket();
                        IswebsocketStarted=true;
                     }

                     // Update notification badge
                     updateNotificationBadge();

                container.style.display = "none";
                chatcontainer.style.display = "none";
                app.style.display = "block";

                const queryParams = new URLSearchParams(window.location.search);
                let selectedCategory = queryParams.get("category");

                if (!selectedCategory) {
                    if (path != "/Dashboard"){
                        window.location.href="/notfound"
                    }else{
                        app.innerHTML = routes[path].render();
                        LoadDataFromServer("all");
                    }
                } else {
                    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
                        app.innerHTML = routes[path].render();
                    }
                    var categoryMap = {
                        "technology": "technology",
                        "sports": "sports",
                        "entertainment": "entertainment",
                        "news": "news",
                         "other":"other",
                        "created_post":"created_post",
                        "liked":"liked"
                    };
                    if (!categoryMap[selectedCategory]) {
                        window.location.href = "/notfound"
                        return
                    }


                    LoadDataFromServer(categoryMap[selectedCategory]);
                }

                highlightActiveCategory(selectedCategory);

                // Initialize trending toggle functionality
                initTrendingToggle();

            } else if (path.startsWith("/privatemessages")) {

                if(!IswebsocketStarted){
                    connectWebSocket();
                    IswebsocketStarted=true;
                }

                app.style.display = "none"
                container.style.display = "none";
                chatcontainer.style.display = "flex"

                chatcontainer.innerHTML = routes[path].render();
            } else {
                app.style.display = "none"
                container.style.display = "block";
                chatcontainer.style.display = "none";

                container.innerHTML = routes[path].render();

            }

            // Remove existing script
            let existingScript = document.querySelector("#dynamicScript");
            if (existingScript) {
                document.body.removeChild(existingScript);
            }

            // Load page-specific script
            if (routes[path].script) {
                loadScript(routes[path].script)
                    .then(() => console.log(`${routes[path].script} loaded successfully`))
                    .catch(() => console.error(`Error loading ${routes[path].script}`));
            }

            // Remove existing CSS links
            let existingCssLinks = document.querySelectorAll(".dynamicCss");
            existingCssLinks.forEach(link => {
                document.head.removeChild(link);
            });

            // Load page-specific CSS
            if (routes[path].css) {
                if (Array.isArray(routes[path].css)) {
                    // Handle array of CSS files
                    routes[path].css.forEach((cssFile, index) => {
                        let cssLink = document.createElement("link");
                        cssLink.rel = "stylesheet";
                        cssLink.href = cssFile;
                        cssLink.className = "dynamicCss";
                        cssLink.id = `dynamicCss-${index}`;
                        document.head.appendChild(cssLink);
                        console.log(`${cssFile} loaded successfully`);
                    });
                } else {
                    // Handle single CSS file
                    let cssLink = document.createElement("link");
                    cssLink.rel = "stylesheet";
                    cssLink.href = routes[path].css;
                    cssLink.className = "dynamicCss";
                    cssLink.id = "dynamicCss-0";
                    document.head.appendChild(cssLink);
                    console.log(`${routes[path].css} loaded successfully`);
                }
            }
        } else {
            window.location.href = "/notfound"
        }
    }


    // Handle back/forward browser navigation
    window.onpopstate = renderPage;

    // Handle navigation for links
    document.addEventListener("click", (e) => {
        let target = e.target.closest("a");
        if (target) {
            if (target.id !== "signup") {
                if (target && target.getAttribute("href").startsWith("/")) {
                    e.preventDefault();
                    navigate(target.getAttribute("href"));
                }
            }
        }

    });

    renderPage();
};
