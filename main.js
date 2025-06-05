
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
