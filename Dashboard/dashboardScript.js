async function updateUserData() {


    import("../query/userdetail.js").then(async({fetchUserProfile})=>{

        const query = `query {
                        user {
                            id
                            login
                            email
                            attrs
                            auditRatio

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
                var totalXps = userXp.data.transaction
                .filter((t) => t.type === "xp")
                .reduce((sum, tx) => {
                      return   sum + tx.amount;
                  }, 0);
                  totalXps=Math.floor(totalXps/1000);



                  // Update card values with animation
           animateValue('totalXP', 0, totalXps, 1500);



           setTimeout(() => {
               animateValue('totalAudits', 0, userdetail.data.user[0].auditRatio, 1000);
           }, 500);
    })


}



// Dynamic import helper for fetchUserProfile
async function getFetchUserProfile() {
    try {
        const module = await import("../query/userdetail.js");
        return module.fetchUserProfile;
    } catch (error) {
        console.warn('Could not import fetchUserProfile:', error);
        // Return fallback function
        return async () => {
            console.warn('Using fallback data - fetchUserProfile not available');
            return null;
        };
    }
}

// Function to process XP data from GraphQL response
function processXpData(userXp) {
    if (!userXp || !userXp.data || !userXp.data.transaction) {
        console.warn('No XP data available, using default data');
        return [
            { month: "Jan", value: 0 },
            { month: "Feb", value: 0 },
            { month: "Mar", value: 0 },
            { month: "Apr", value: 0 },
            { month: "May", value: 0 },
            { month: "Jun", value: 0 }
        ];
    }
   
    var lastyeartotalXp=userXp.data.transaction.filter((x)=> x.type==="xp"  && new Date(x.createdAt).getFullYear() != 2025).reduce((prev,curr)=> prev+curr.amount,0);
         console.log(lastyeartotalXp)
    var transactions=userXp.data.transaction.filter((x)=> x.type==="xp"  && new Date(x.createdAt).getFullYear() == 2025)
        
    // Group transactions by month and sum XP
    const monthlyXP = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    transactions.forEach(transaction => {
        const date = new Date(transaction.createdAt);
        const monthKey = monthNames[date.getMonth()];

        if (!monthlyXP[monthKey]) {
            monthlyXP[monthKey] = 0;
        }
        monthlyXP[monthKey] += transaction.amount;
    });


    

    // Convert to array format for chart
    const chartData = [];
    let cumulativeXP = lastyeartotalXp/1000;

    // Get last 6 months of data
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthName = monthNames[monthDate.getMonth()];

        const monthXP = monthlyXP[monthName] || 0;
        cumulativeXP += (monthXP/1000);

        chartData.push({
            month: monthName,
            value: cumulativeXP
        });
    }

    console.log(chartData)

    return chartData;
}



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

async function createXPChart() {
    const svg = document.getElementById('xpChart');

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


    const fetchUserProfile = await getFetchUserProfile();
    let userXp = await fetchUserProfile(userXpQuery);

    console.log('Raw userXp data:', userXp);

    // Process the userXp data to create chart data
    const processedXpData = processXpData(userXp);

    console.log('Processed XP data for chart:', processedXpData);

    // Ensure we have valid data for the chart
    if (!processedXpData || processedXpData.length === 0) {
        console.warn('No XP data available for chart');
        return;
    }

    const maxXP = Math.max(...processedXpData.map(d => d.value)) || 100; // Fallback to 100 if no data

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

    processedXpData.forEach((data, index) => {
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
    const lastX = 50 + ((processedXpData.length - 1) * 50);
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




function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = (start + (end - start) * progress);
        element.textContent = currentValue.toFixed(2)

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


  




function createPieChart(data) {
    const svg = document.getElementById('pieChart');
    const tooltip = document.getElementById('tooltip');
    const legend = document.getElementById('legend');
    
    const centerX = 200;
    const centerY = 200;
    const radius = 140;
    
    let currentAngle = -90; // Start from top
    const total = data[0].value+data[1].value;
    
    // Clear existing content
    svg.innerHTML = '';
    legend.innerHTML = '';
    
    // Create pie slices
    data.forEach((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const endAngle = currentAngle + angle;
        
        // Convert angles to radians
        const startRad = (currentAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        
        // Calculate arc path
        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);
        
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');
        
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', item.color);
        path.setAttribute('class', 'pie-slice');
        path.setAttribute('data-category', item.category);
        path.setAttribute('data-value', item.value);
        path.setAttribute('data-percentage', percentage.toFixed(1));
        
        // Add hover effects
        path.addEventListener('mouseenter', (e) => {
            const rect = svg.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
            tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
            tooltip.innerHTML = `
                <strong>${item.category}</strong><br>
                Count: ${item.value}<br>
                Percentage: ${percentage.toFixed(1)}%
            `;
            tooltip.style.opacity = '1';
            
            // Highlight corresponding legend item
            const legendItem = document.querySelector(`[data-category="${item.category}"]`);
            if (legendItem) {
                legendItem.style.background = 'rgba(255, 255, 255, 1)';
                legendItem.style.transform = 'translateY(-2px)';
            }
        });
        
        path.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            
            // Remove highlight from legend item
            const legendItem = document.querySelector(`[data-category="${item.category}"]`);
            if (legendItem) {
                legendItem.style.background = 'rgba(255, 255, 255, 0.7)';
                legendItem.style.transform = 'translateY(0)';
            }
        });
        
        path.addEventListener('mousemove', (e) => {
            const rect = svg.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
            tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
        });
        
        svg.appendChild(path);
        
        // Add label
        const labelAngle = currentAngle + angle / 2;
        const labelRad = (labelAngle * Math.PI) / 180;
        const labelX = centerX + (radius * 0.75) * Math.cos(labelRad);
        const labelY = centerY + (radius * 0.75) * Math.sin(labelRad);
        
        if (percentage > 5) { // Only show label if slice is large enough
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelX);
            text.setAttribute('y', labelY);
            text.setAttribute('class', 'center-text');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', 'white');
            text.textContent = `${percentage.toFixed(1)}%`;
            svg.appendChild(text);
        }
        
        currentAngle = endAngle;
        
        // Create legend item
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.setAttribute('data-category', item.category);
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${item.color}"></div>
            <div class="legend-text">${item.category}</div>
            <div class="legend-percentage">${percentage.toFixed(1)}%</div>
        `;
        
        // Add click interaction to legend
        legendItem.addEventListener('click', () => {
            const pathElement = document.querySelector(`path[data-category="${item.category}"]`);
            if (pathElement) {
                pathElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            }
        });
        
        legend.appendChild(legendItem);
    });
    
    // Add center circle for donut effect
    const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerCircle.setAttribute('cx', centerX);
    centerCircle.setAttribute('cy', centerY);
    centerCircle.setAttribute('r', '40');
    centerCircle.setAttribute('fill', 'white');
    centerCircle.setAttribute('stroke', '#ddd');
    centerCircle.setAttribute('stroke-width', '2');
    svg.appendChild(centerCircle);
    
    // Add center text
    const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerText.setAttribute('x', centerX);
    centerText.setAttribute('y', centerY - 5);
    centerText.setAttribute('class', 'center-text');
    centerText.setAttribute('font-size', '14');
    centerText.textContent = 'Total Projects';
    svg.appendChild(centerText);
    
    const centerValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerValue.setAttribute('x', centerX);
    centerValue.setAttribute('y', centerY + 10);
    centerValue.setAttribute('class', 'center-text');
    centerValue.setAttribute('font-size', '16');
    centerValue.textContent = total.toString();
    svg.appendChild(centerValue);
}





// Initialize the chart
async function InitiliazeChart() {
      // Project success rate data
  import("../query/userdetail.js").then(async({fetchUserProfile})=>{
    const userXpQuery = `
query{ 
   result{
          grade
   }
}
`;


let userXp=await fetchUserProfile(userXpQuery)

const totalXps = userXp.data.result;

const pass = totalXps
.filter((t) => t.grade >=1)
.length;

const fail = totalXps
.filter((t) => t.grade < 1)
.length;

console.log(`pass ${pass}`)
console.log(`fail ${fail}`)
var projectData = [
    { category: 'Project Pass', value: pass, color: '#4CAF50' },
    { category: 'Project Fail', value: fail, color: '#E74C3C' }
  ];

  createPieChart(projectData);

  })

}




// Initialize dashboard
async function initializeDashboard() {
    await updateUserData();
    await createXPChart();
    await InitiliazeChart();

    const slices = document.querySelectorAll('.pie-slice');
    slices.forEach((slice, index) => {
        slice.style.opacity = '0';
        slice.style.transform = 'scale(0)';
        slice.style.transformOrigin = '200px 200px';
        
        setTimeout(() => {
            slice.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            slice.style.opacity = '1';
            slice.style.transform = 'scale(1)';
        }, index * 100);
    });



    // Add logout event listener
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Auto-initialize when script loads
initializeDashboard();