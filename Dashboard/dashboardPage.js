export function DashboardComponet(){
    return  `
    <nav class="nav">
        <div class="user">
            <span id="username">Teddy</span>
            <i class="fas fa-user"></i>
        </div>
        <div>
            <button class="logout">Log out</button>
        </div>
    </nav>
    
    <div class="container">
        <div class="cards">
            <div id="userIdentification" class="card">
                <div class="cardHead">
                    <span>User Profile</span>
                </div>
                <div class="cardContent">
                    <div><strong>Name:</strong> <span id="Name">Teddy</span></div>
                    <div><strong>Email:</strong> <span id="useremail">20</span></div>
                    <div><strong>Gender:</strong> <span id="usergender">20</span></div>
                    <div><strong>Phone Number:</strong> <span id="phonenumber">20</span></div>
                    <div class="label">Basic Information</div>
                </div>
            </div>
            
            <div id="userXp" class="card xp-progress">
                <div class="cardHead">
                    <span>XP Points</span>
                </div>
                <div class="cardContent">
                    <div class="value" id="totalXP">0</div>
                    <div class="label">Total XP Earned</div>
                </div>
            </div>
            
            <div id="userAudit" class="card audit-progress">
                <div class="cardHead">
                    <span>Audits Completed</span>
                </div>
                <div class="cardContent">
                    <div class="value" id="totalAudits">0</div>
                    <div class="label">Successful Audits</div>
                </div>
            </div>
        </div>
        
        <div class="graphs">
            <div class="graph-container">
                <div class="graph-title">XP Progress Over Time</div>
                <svg id="xpChart" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    <!-- Grid lines will be generated dynamically -->
                </svg>
            </div>
            
            <div class="graph-container">
                <div class="graph-title">Audit Performance Over Time</div>
                <svg id="auditChart" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                    <!-- Chart will be generated dynamically -->
                </svg>
            </div>
        </div>
    </div>`
}