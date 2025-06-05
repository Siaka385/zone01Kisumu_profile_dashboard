

function dashboardComponet(){
    return  `<nav class="nav">
        <div class="user">
            <span id="username">Teddy</span>
            <i class="fas fa-user"></i>
        </div>
        <div>
            <button class="logout" onclick="handleLogout()">Log out</button>
        </div>
    </nav>
    
    <div class="container">
        <div class="cards">
            <div id="userIdentification" class="card">
                <div class="cardHead">
                    <span>User Profile</span>
                </div>
                <div class="cardContent">
                    <div><strong>Name:</strong> Teddy</div>
                    <div><strong>Age:</strong> 20</div>
                    <div><strong>Email:</strong> tud@gmail</div>
                    <div class="label">Basic Information</div>
                </div>
            </div>
            
            <div id="userXp" class="card xp-progress">
                <div class="cardHead">
                    <span>XP Points</span>
                </div>
                <div class="cardContent">
                    <div class="value">400</div>
                    <div class="label">Total XP Earned</div>
                </div>
            </div>
            
            <div id="userAudit" class="card audit-progress">
                <div class="cardHead">
                    <span>Audits Completed</span>
                </div>
                <div class="cardContent">
                    <div class="value">10</div>
                    <div class="label">Successful Audits</div>
                </div>
            </div>
        </div>
        
        <div class="graphs">
            <div class="graph-container">
                <div class="graph-title">XP Progress Over Time</div>
                <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    <!-- Grid lines -->
                    <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#4facfe;stop-opacity:0.3"/>
                            <stop offset="100%" style="stop-color:#4facfe;stop-opacity:0"/>
                        </linearGradient>
                    </defs>
                    
                    <!-- Grid -->
                    <g class="grid">
                        <line x1="50" y1="200" x2="350" y2="200" class="grid-line"/>
                        <line x1="50" y1="160" x2="350" y2="160" class="grid-line"/>
                        <line x1="50" y1="120" x2="350" y2="120" class="grid-line"/>
                        <line x1="50" y1="80" x2="350" y2="80" class="grid-line"/>
                        <line x1="50" y1="40" x2="350" y2="40" class="grid-line"/>
                        
                        <line x1="50" y1="40" x2="50" y2="200" class="grid-line"/>
                        <line x1="110" y1="40" x2="110" y2="200" class="grid-line"/>
                        <line x1="170" y1="40" x2="170" y2="200" class="grid-line"/>
                        <line x1="230" y1="40" x2="230" y2="200" class="grid-line"/>
                        <line x1="290" y1="40" x2="290" y2="200" class="grid-line"/>
                        <line x1="350" y1="40" x2="350" y2="200" class="grid-line"/>
                    </g>
                    
                    <!-- Axes -->
                    <line x1="50" y1="40" x2="50" y2="200" stroke="#333" stroke-width="2"/>
                    <line x1="50" y1="200" x2="350" y2="200" stroke="#333" stroke-width="2"/>
                    
                    <!-- Y-axis labels -->
                    <text x="45" y="45" class="axis-text" text-anchor="end">500</text>
                    <text x="45" y="85" class="axis-text" text-anchor="end">400</text>
                    <text x="45" y="125" class="axis-text" text-anchor="end">300</text>
                    <text x="45" y="165" class="axis-text" text-anchor="end">200</text>
                    <text x="45" y="205" class="axis-text" text-anchor="end">0</text>
                    
                    <!-- X-axis labels -->
                    <text x="50" y="220" class="axis-text" text-anchor="middle">Jan</text>
                    <text x="110" y="220" class="axis-text" text-anchor="middle">Feb</text>
                    <text x="170" y="220" class="axis-text" text-anchor="middle">Mar</text>
                    <text x="230" y="220" class="axis-text" text-anchor="middle">Apr</text>
                    <text x="290" y="220" class="axis-text" text-anchor="middle">May</text>
                    <text x="350" y="220" class="axis-text" text-anchor="middle">Jun</text>
                    
                    <!-- Area under curve -->
                    <path d="M 50 180 L 110 160 L 170 140 L 230 120 L 290 100 L 350 80 L 350 200 L 50 200 Z" 
                          fill="url(#areaGradient)"/>
                    
                    <!-- Line chart -->
                    <path class="line-chart" d="M 50 180 L 110 160 L 170 140 L 230 120 L 290 100 L 350 80"/>
                    
                    <!-- Data points -->
                    <circle class="data-point" cx="50" cy="180" r="4"/>
                    <circle class="data-point" cx="110" cy="160" r="4"/>
                    <circle class="data-point" cx="170" cy="140" r="4"/>
                    <circle class="data-point" cx="230" cy="120" r="4"/>
                    <circle class="data-point" cx="290" cy="100" r="4"/>
                    <circle class="data-point" cx="350" cy="80" r="4"/>
                </svg>
            </div>
            
            <div class="graph-container">
                <div class="graph-title">Audit Performance Over Time</div>
                <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="successBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#4facfe"/>
                            <stop offset="100%" style="stop-color:#00f2fe"/>
                        </linearGradient>
                        <linearGradient id="failedBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#f093fb"/>
                            <stop offset="100%" style="stop-color:#f5576c"/>
                        </linearGradient>
                    </defs>
                    
                    <!-- Grid -->
                    <g class="grid">
                        <line x1="50" y1="200" x2="350" y2="200" class="grid-line"/>
                        <line x1="50" y1="160" x2="350" y2="160" class="grid-line"/>
                        <line x1="50" y1="120" x2="350" y2="120" class="grid-line"/>
                        <line x1="50" y1="80" x2="350" y2="80" class="grid-line"/>
                        <line x1="50" y1="40" x2="350" y2="40" class="grid-line"/>
                    </g>
                    
                    <!-- Axes -->
                    <line x1="50" y1="40" x2="50" y2="200" stroke="#333" stroke-width="2"/>
                    <line x1="50" y1="200" x2="350" y2="200" stroke="#333" stroke-width="2"/>
                    
                    <!-- Y-axis labels -->
                    <text x="45" y="45" class="axis-text" text-anchor="end">5</text>
                    <text x="45" y="85" class="axis-text" text-anchor="end">4</text>
                    <text x="45" y="125" class="axis-text" text-anchor="end">3</text>
                    <text x="45" y="165" class="axis-text" text-anchor="end">2</text>
                    <text x="45" y="205" class="axis-text" text-anchor="end">0</text>
                    
                    <!-- X-axis labels -->
                    <text x="80" y="220" class="axis-text" text-anchor="middle">Jan</text>
                    <text x="130" y="220" class="axis-text" text-anchor="middle">Feb</text>
                    <text x="180" y="220" class="axis-text" text-anchor="middle">Mar</text>
                    <text x="230" y="220" class="axis-text" text-anchor="middle">Apr</text>
                    <text x="280" y="220" class="axis-text" text-anchor="middle">May</text>
                    <text x="330" y="220" class="axis-text" text-anchor="middle">Jun</text>
                    
                    <!-- Bar chart - Successful audits -->
                    <rect x="65" y="160" width="15" height="40" fill="url(#successBarGradient)" rx="2" class="bar success"/>
                    <rect x="115" y="120" width="15" height="80" fill="url(#successBarGradient)" rx="2" class="bar success"/>
                    <rect x="165" y="160" width="15" height="40" fill="url(#successBarGradient)" rx="2" class="bar success"/>
                    <rect x="215" y="80" width="15" height="120" fill="url(#successBarGradient)" rx="2" class="bar success"/>
                    <rect x="265" y="120" width="15" height="80" fill="url(#successBarGradient)" rx="2" class="bar success"/>
                    <rect x="315" y="160" width="15" height="40" fill="url(#successBarGradient)" rx="2" class="bar success"/>
                    
                    <!-- Bar chart - Failed audits -->
                    <rect x="85" y="180" width="15" height="20" fill="url(#failedBarGradient)" rx="2" class="bar failed"/>
                    <rect x="135" y="200" width="15" height="0" fill="url(#failedBarGradient)" rx="2" class="bar failed"/>
                    <rect x="185" y="180" width="15" height="20" fill="url(#failedBarGradient)" rx="2" class="bar failed"/>
                    <rect x="235" y="200" width="15" height="0" fill="url(#failedBarGradient)" rx="2" class="bar failed"/>
                    <rect x="285" y="200" width="15" height="0" fill="url(#failedBarGradient)" rx="2" class="bar failed"/>
                    <rect x="335" y="180" width="15" height="20" fill="url(#failedBarGradient)" rx="2" class="bar failed"/>
                </svg>
                
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(135deg, #4facfe, #00f2fe);"></div>
                        <span>Successful Audits</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(135deg, #f093fb, #f5576c);"></div>
                        <span>Failed Audits</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}