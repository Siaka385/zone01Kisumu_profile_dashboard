
// Dynamic data configuration
const userDatas = {
    name: "Teddy",
    age: 20,
    xpData: [
        { month: "Jan", value: 50 },
        { month: "Feb", value: 120 },
        { month: "Mar", value: 200 },
        { month: "Apr", value: 280 },
        { month: "May", value: 350 },
        { month: "Jun", value: 400 }
    ],
    auditData: [
        { month: "Jan", successful: 1, failed: 1 },
        { month: "Feb", successful: 3, failed: 0 },
        { month: "Mar", successful: 1, failed: 1 },
        { month: "Apr", successful: 4, failed: 0 },
        { month: "May", successful: 3, failed: 0 },
        { month: "Jun", successful: 1, failed: 1 }
    ]
};

function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        alert('Logging out...');

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user_id');
      if (window.showLogin){
        window.showLogin();
      }else{
        console.log("sbkjdbvjczbkjlvbakj ")
      }
    }
}

function createGrid(svg, maxY) {
    const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridGroup.setAttribute("class", "grid");

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (i * 32);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "50");
        line.setAttribute("y1", y.toString());
        line.setAttribute("x2", "350");
        line.setAttribute("y2", y.toString());
        line.setAttribute("class", "grid-line");
        gridGroup.appendChild(line);
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
        const x = 50 + (i * 50);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x.toString());
        line.setAttribute("y1", "40");
        line.setAttribute("x2", x.toString());
        line.setAttribute("y2", "200");
        line.setAttribute("class", "grid-line");
        gridGroup.appendChild(line);
    }

    svg.appendChild(gridGroup);

    // Add axes
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", "50");
    yAxis.setAttribute("y1", "40");
    yAxis.setAttribute("x2", "50");
    yAxis.setAttribute("y2", "200");
    yAxis.setAttribute("stroke", "#333");
    yAxis.setAttribute("stroke-width", "2");
    svg.appendChild(yAxis);

    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", "50");
    xAxis.setAttribute("y1", "200");
    xAxis.setAttribute("x2", "350");
    xAxis.setAttribute("y2", "200");
    xAxis.setAttribute("stroke", "#333");
    xAxis.setAttribute("stroke-width", "2");
    svg.appendChild(xAxis);
}

function createXPChart() {
    const svg = document.getElementById('xpChart');
    const maxXP = Math.max(...userDatas.xpData.map(d => d.value));

    // Clear existing content
    svg.innerHTML = '';

    // Add gradient definition
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "areaGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:#4facfe;stop-opacity:0.3");

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:#4facfe;stop-opacity:0");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    createGrid(svg, maxXP);

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = Math.round((maxXP / 5) * (5 - i));
        const y = 40 + (i * 32) + 5;
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "45");
        text.setAttribute("y", y.toString());
        text.setAttribute("class", "axis-text");
        text.setAttribute("text-anchor", "end");
        text.textContent = value.toString();
        svg.appendChild(text);
    }

    // X-axis labels and plot points
    let pathData = "M ";
    let areaPath = "M ";

    userDatas.xpData.forEach((data, index) => {
        const x = 50 + (index * 50);
        const y = 200 - ((data.value / maxXP) * 160);

        // X-axis label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x.toString());
        text.setAttribute("y", "220");
        text.setAttribute("class", "axis-text");
        text.setAttribute("text-anchor", "middle");
        text.textContent = data.month;
        svg.appendChild(text);

        // Add to path
        if (index === 0) {
            pathData += `${x} ${y}`;
            areaPath += `${x} ${y}`;
        } else {
            pathData += ` L ${x} ${y}`;
            areaPath += ` L ${x} ${y}`;
        }

        // Data point
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("class", "data-point xp-point");
        circle.setAttribute("cx", x.toString());
        circle.setAttribute("cy", y.toString());
        circle.setAttribute("r", "4");
        svg.appendChild(circle);
    });

    // Close area path
    const lastX = 50 + ((userDatas.xpData.length - 1) * 50);
    areaPath += ` L ${lastX} 200 L 50 200 Z`;

    // Area under curve
    const areaElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    areaElement.setAttribute("d", areaPath);
    areaElement.setAttribute("fill", "url(#areaGradient)");
    svg.appendChild(areaElement);

    // Line
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "line-chart xp-line");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
}

function createAuditChart() {
    const svg = document.getElementById('auditChart');
    // Calculate cumulative successful audits over time
    const cumulativeData = [];
    let cumulative = 0;

    userDatas.auditData.forEach((data, index) => {
        cumulative += data.successful;
        cumulativeData.push({
            month: data.month,
            value: cumulative
        });
    });

    const maxAudits = cumulativeData[cumulativeData.length - 1].value;

    // Clear existing content
    svg.innerHTML = '';

    // Add gradient definition (same as XP chart)
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "auditAreaGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:#4facfe;stop-opacity:0.3");

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:#4facfe;stop-opacity:0");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    createGrid(svg, maxAudits);

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = Math.round((maxAudits / 5) * (5 - i));
        const y = 40 + (i * 32) + 5;
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "45");
        text.setAttribute("y", y.toString());
        text.setAttribute("class", "axis-text");
        text.setAttribute("text-anchor", "end");
        text.textContent = value.toString();
        svg.appendChild(text);
    }

    // X-axis labels and plot points
    let pathData = "M ";
    let areaPath = "M ";

    cumulativeData.forEach((data, index) => {
        const x = 50 + (index * 50);
        const y = 200 - ((data.value / maxAudits) * 160);

        // X-axis label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x.toString());
        text.setAttribute("y", "220");
        text.setAttribute("class", "axis-text");
        text.setAttribute("text-anchor", "middle");
        text.textContent = data.month;
        svg.appendChild(text);

        // Add to path
        if (index === 0) {
            pathData += `${x} ${y}`;
            areaPath += `${x} ${y}`;
        } else {
            pathData += ` L ${x} ${y}`;
            areaPath += ` L ${x} ${y}`;
        }

        // Data point
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("class", "data-point success-point");
        circle.setAttribute("cx", x.toString());
        circle.setAttribute("cy", y.toString());
        circle.setAttribute("r", "4");
        svg.appendChild(circle);
    });

    // Close area path
    const lastX = 50 + ((cumulativeData.length - 1) * 50);
    areaPath += ` L ${lastX} 200 L 50 200 Z`;

    // Area under curve
    const areaElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    areaElement.setAttribute("d", areaPath);
    areaElement.setAttribute("fill", "url(#auditAreaGradient)");
    svg.appendChild(areaElement);

    // Line
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "line-chart success-line");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
}

async function updateUserData() {


    import("../query/userdetail.js").then(async({fetchUserProfile})=>{ 
        
        const query = `query { 
                        user {
                            id
                            login
                            email
                            attrs
                            
                        }
                        
                    }
                `;
                
                let userdetail=await fetchUserProfile(query)
                document.getElementById("username").textContent=`${userdetail.data.user[0].login}`
                document.getElementById('Name').textContent =`${userdetail.data.user[0].attrs.firstName} ${userdetail.data.user[0].attrs.middleName} ${userdetail.data.user[0].attrs.lastName}`;
                document.getElementById('useremail').textContent=`${userdetail.data.user[0].attrs.email}`;
                document.getElementById('usergender').textContent=`${userdetail.data.user[0].attrs.gender}`
                document.getElementById('phonenumber').textContent=`${userdetail.data.user[0].attrs.phone}`


                const userXpQuery = `
                query {
                  transaction(where: {
                    _and: [
                      { eventId: { _eq: 75 } }
                    ]
                  }, order_by: { createdAt: desc }) {
                    amount
                    createdAt
                    path
                    type
                  }
                }
              `;
              
                
                let userXp=await fetchUserProfile(userXpQuery)
                const totalXps = userXp.data.transaction.reduce((sum, tx) => {
                    return sum + tx.amount;
                  }, 0);;

             
                
                console.log(totalXps)
    
                  // Update card values with animation
           animateValue('totalXP', 0, totalXps, 1500);
    })

    

    // Calculate totals
    const totalSuccessfulAudits = userDatas.auditData.reduce((sum, data) => sum + data.successful, 0);

  
    setTimeout(() => {
        animateValue('totalAudits', 0, totalSuccessfulAudits, 1000);
    }, 500);
}

function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = (start + (end - start) * progress);
        element.textContent = currentValue

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Initialize dashboard
async function initializeDashboard() {
    await updateUserData();
    createXPChart();
    createAuditChart();

    // Add logout event listener
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Auto-initialize when script loads
initializeDashboard();
