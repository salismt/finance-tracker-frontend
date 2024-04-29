(()=>{"use strict";const n="localhost"===window.location.hostname?{API_URL:"http://localhost:3000/",FRONTEND_URL:"http://localhost:8080/",NODE_ENV:"development",URL_PREFIX:"/"}:{API_URL:"https://finance-tracker-backend-zbxuhg7gpq-as.a.run.app/",FRONTEND_URL:"https://salismt.github.io/finance-tracker-frontend/",NODE_ENV:"production",URL_PREFIX:"/finance-tracker-frontend/"},e=new class{constructor(){this.onAuthChange=null,this.load()}loginWithPassport(n,e){this.isAuthenticated=!0,this.token=n,this.name=e.name,this.email=e.email,this.save(),this.notifyAuthChange()}logout(){this.isAuthenticated=!1,this.name=null,this.email=null,this.token=null,this.updateUI()}save(){sessionStorage.setItem("user",JSON.stringify({isAuthenticated:this.isAuthenticated,token:this.token,name:this.name,email:this.email}))}notifyAuthChange(){this.onAuthChange&&this.onAuthChange()}load(){const n=JSON.parse(sessionStorage.getItem("user"));n&&(this.isAuthenticated=n.isAuthenticated,this.token=n.token,this.name=n.name,this.email=n.email)}updateUI(){"function"==typeof this.onAuthChange&&this.onAuthChange()}};async function t(t){t.preventDefault();const a=document.getElementById("email").value,o=document.getElementById("password").value;try{const t=await axios.post(`${n.API_URL}auth/login`,{email:a,password:o});e.loginWithPassport(t.data.token,t.data.user),page.redirect(`${n.URL_PREFIX}profile`)}catch(n){console.error("Login failed:",n),document.getElementById("login-error").textContent="Failed to login"}}async function a(e){e.preventDefault();const t=document.getElementById("name").value,a=document.getElementById("email").value,o=document.getElementById("password").value;try{const e=await axios.post(`${n.API_URL}auth/signup`,{name:t,email:a,password:o});console.log("Signup successful",e),page.redirect(`${n.URL_PREFIX}login`)}catch(n){console.error("Signup failed:",n),document.getElementById("signup-error").textContent="Failed to sign up"}}const o="development"===n.NODE_ENV;function i(){return o?Promise.resolve({categories:[{key:"food"},{key:"transport"}]}):axios.get(`${n.API_URL}api/categories`,{headers:{Authorization:`Bearer ${e.token}`}}).then((n=>n.data)).catch((n=>(console.error("Failed to fetch categories",n),[])))}const s=class{constructor(){this.nav=document.getElementById("nav"),this.setupNavbar(),e.onAuthChange=this.setupNavbar.bind(this)}setupNavbar(){this.nav&&(e.isAuthenticated?this.nav.innerHTML=`\n                <nav class="vertical-navbar">\n                    <a href="${n.FRONTEND_URL}" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/home.png" alt="Home" class="nav-icon"/>\n                    </a>\n                    <a href="${n.FRONTEND_URL}profile" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/user.png" alt="Profile" class="nav-icon"/>\n                    </a>\n                    <a href="${n.FRONTEND_URL}transactions" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/file.png" alt="Transactions" class="nav-icon"/>\n                    </a>\n                    <a href="#" onclick="this.onLogout(); return false;" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/logout.png" alt="Logout" class="nav-icon"/>\n                    </a>\n                    <a href="${n.FRONTEND_URL}add-transaction" id="add-transaction-btn" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/plus.png" alt="Transactions" class="nav-icon"/>\n                    </a>\n                </nav>\n            `:this.nav.innerHTML=`\n                <nav class="vertical-navbar">\n                    <a href="${n.FRONTEND_URL}login" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/login.png" alt="Login" class="nav-icon"/>\n                    </a>\n                    <a href="${n.FRONTEND_URL}signup" class="nav-item">\n                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/signup.png" alt="Signup" class="nav-icon"/>\n                    </a>\n                </nav>\n\n            `)}onLogout(){this.setupNavbar()}};async function r(t){t.preventDefault();const a=document.getElementById("transaction-name").value,o=document.getElementById("transaction-date").value,i=document.getElementById("category").value,s=document.getElementById("amount").value,r=document.getElementById("type").value;try{const t=await axios.post(`${n.API_URL}api/transactions`,{name:a,date:o,amount:s,currency:"IDR",category:i,type:r},{headers:{Authorization:`Bearer ${e.token}`}});console.log("Add transaction successful",t),page.redirect(`${n.URL_PREFIX}transactions`)}catch(n){console.error("Add transaction failed:",n),document.getElementById("add-transaction-error").textContent="Failed to add data"}}function c(){e.isAuthenticated?(document.getElementById("app").innerHTML='\n    <div id="dashboard" class="dashboard">\n      <div class="dashboard-item">\n        <h3>Current Balance</h3>\n        <div class="amount-box">$<span id="current-balance">Loading...</span></div>\n      </div>\n      <div class="dashboard-item">\n        <h3>Total Expense</h3>\n        <div class="amount-box">$<span id="total-expense">Loading...</span></div>\n      </div>\n      <div class="dashboard-item">\n        <h3>Total Income</h3>\n        <div class="amount-box">$<span id="total-income">Loading...</span></div>\n      </div>\n      \x3c!-- For future development --\x3e\n      \x3c!--<div class="dashboard-item full-width">\n        <span>Balance History</span>\n        <div id="balance-history" class="chart"></div>\n      </div>\n      <div class="dashboard-item full-width">\n        <span>Categories</span>\n        <div id="categories-chart" class="chart"></div>\n      </div>--\x3e\n      <div class="dashboard-item full-width">\n        <h3>Transactions</h3>\n        <div id="last-transactions">Loading...</div>\n      </div>\n    </div>\n\n    \x3c!-- Input Transaction Modal --\x3e\n\n  ',async function(){return o?Promise.resolve({current_balance:"10000",total_expense:"5000",total_income:"15000",balance_history:[{date:"2024-01-15T00:00:00+00:00",balance:"7000"},{date:"2024-01-16T00:00:00+00:00",balance:"8000"}],categories:[{percentage:30.5,name:"food"},{percentage:16,name:"transport"}],transactions:[{name:"mcdonald",category:"food",date:"2020-12-09T16:09:53+00:00",currency:"IDR",amount:"300",type:"expense"}]}):axios.get(`${n.API_URL}api/dashboard`,{headers:{Authorization:`Bearer ${e.token}`}}).then((n=>n.data)).catch((n=>console.error("Failed to fetch current balance",n)))}().then((n=>{null!=n&&(document.getElementById("current-balance").textContent=n.current_balance,document.getElementById("total-expense").textContent=n.total_expense,document.getElementById("total-income").textContent=n.total_income,document.getElementById("last-transactions").innerHTML=n.transactions.slice(0,3).map((n=>`\n        <div class="transaction-item">\n          <span class="transaction-description">${n.name}</span>\n          <span class="transaction-date">${new Date(n.date).toLocaleDateString()}</span>\n          <span class="transaction-category">${n.category}</span>\n          <span class="transaction-amount">$${n.amount}</span>\n        </div>\n      `)).join(""))}))):document.getElementById("app").innerHTML="<h1>Home Page</h1><p>Welcome to our finance tracker.</p>"}function l(){const n=document.getElementById("app");n.innerHTML="<h1>Categories</h1><div>Loading categories...</div>",i().then((e=>{const t=e.categories.map((n=>`<li>${n.name}</li>`)).join("");n.innerHTML=`<h1>Categories</h1><ul>${t}</ul>`}))}function d(){document.getElementById("app").innerHTML='\n    <div class="transactions-page">\n      <div class="transaction-filters">\n        <h1 class="page-title">Statement</h1>\n        <input type="search" placeholder="Search" class="transaction-search" />\n        <select class="time-frame-select">\n          <option value="1">1 Month</option>\n          <option value="3">3 Months</option>\n          <option value="6">6 Months</option>\n          <option value="12">1 Year</option>\n        </select>\n      </div>\n      <div id="transactions-list" class="transactions-list">\n        \x3c!-- Transactions will be dynamically inserted here --\x3e\n      </div>\n    </div>\n    ',async function(){return o?Promise.resolve({transactions:[{name:"mcdonald",category:"food",date:"2020-12-09T16:09:53+00:00",currency:"IDR",amount:"300",type:"expense"},{name:"mcdonald",category:"food",date:"2020-12-09T16:09:53+00:00",currency:"IDR",amount:"300",type:"expense"}]}):axios.get(`${n.API_URL}api/transactions`,{headers:{Authorization:`Bearer ${e.token}`}}).then((n=>n.data)).catch((n=>{console.error("Failed to fetch transactions",n)}))}().then((n=>{document.getElementById("transactions-list").innerHTML=n.transactions.map((n=>`\n        <div class="transaction-item">\n          <span class="transaction-description">${n.name}</span>\n          <span class="transaction-date">${new Date(n.date).toLocaleDateString()}</span>\n          <span class="transaction-category">${n.category}</span>\n          <span class="transaction-amount">$${n.amount}</span>\n        </div>\n      `)).join("")}))}function m(){document.getElementById("app").innerHTML='\n    <h1>Login</h1>\n    <form id="login-form">\n      <label for="email">Email:</label>\n      <input type="email" id="email" name="email" required>\n      <label for="password">Password:</label>\n      <input type="password" id="password" name="password" required>\n      <button type="submit">Login</button>\n    </form>\n    <div id="login-error"></div>\n  ',document.getElementById("login-form").addEventListener("submit",t)}function p(){document.getElementById("app").innerHTML='\n    <h1>Sign Up</h1>\n    <form id="signup-form">\n      <label for="name">Name:</label>\n      <input type="text" id="name" name="name" required>\n      <label for="email">Email:</label>\n      <input type="email" id="email" name="email" required>\n      <label for="password">Password:</label>\n      <input type="password" id="password" name="password" required>\n      <button type="submit">Sign Up</button>\n    </form>\n    <div id="signup-error"></div>\n  ',document.getElementById("signup-form").addEventListener("submit",a)}function u(){e.isAuthenticated?(document.getElementById("app").innerHTML=`\n    <div class="profile-container">\n      <h2 class="profile-title">Profile</h2>\n      <div class="profile-info">\n        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/man-avatar.png" alt="Profile Image" class="profile-image">\n        <p class="profile-name">${e.name}</p>\n        <p class="profile-email">${e.email}</p>\n      </div>\n      <div class="balance-info">\n        <h3>Balance</h3>\n        <p class="balance-amount">$<span id="profile-balance">220</span></p>\n      </div>\n    </div>\n  `,async function(){return o?Promise.resolve({current_balance:"8000"}):axios.get(`${n.API_URL}api/transactions/balance`,{headers:{Authorization:`Bearer ${e.token}`}}).then((n=>n.data)).catch((n=>(console.error("Failed to fetch balance",n),null)))}().then((n=>{document.getElementById("profile-balance").textContent=n.current_balance}))):page.redirect(`${n.URL_PREFIX}login`)}function g(){e.isAuthenticated?(document.getElementById("app").innerHTML='\n  <div class="modal-like-container">\n  <div class="modal-content">\n    <h2>Input Transaction</h2>\n    <form id="transaction-form">\n      <div class="form-group">\n        <label for="transaction-name">Transaction Name</label>\n        <input type="text" id="transaction-name" name="transaction-name" required>\n      </div>\n\n      <div class="form-group">\n        <label for="category">Category</label>\n        <select id="category" name="category">\n          \x3c!-- Categories options will be populated dynamically --\x3e\n        </select>\n      </div>\n\n      <div class="form-group">\n        <label for="transaction-date">Date of Transaction</label>\n        <input type="date" id="transaction-date" name="transaction-date" required>\n      </div>\n\n      <div class="form-group">\n        <label for="amount">Amount</label>\n        <input type="number" id="amount" name="amount" step="0.01" required>\n      </div>\n\n      <div class="form-group">\n        <label for="type">Type</label>\n        <select id="type" name="type">\n          <option value="expense">Expense</option>\n          <option value="income">Income</option>\n        </select>\n      </div>\n\n      <button type="submit" onclick="">Submit</button>\n    </form>\n  </div>\n</div>\n',i().then((n=>{const e=document.getElementById("category");e.innerHTML="",n.categories.forEach((n=>{const t=document.createElement("option");t.value=n.key,t.textContent=n.key,e.appendChild(t)}))})),document.getElementById("transaction-form").addEventListener("submit",r)):page.redirect(`${n.URL_PREFIX}login`)}document.addEventListener("DOMContentLoaded",(function(){var e=document.createElement("base");e.href=n.URL_PREFIX,document.head.prepend(e),new s,page("/",c),page("/categories",l),page("/transactions",d),page("/add-transaction",g),page("/login",m),page("/signup",p),page("/profile",u),page()}))})();