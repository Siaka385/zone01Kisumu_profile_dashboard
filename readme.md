# 📘 Zone01 Profile Page

This project is a custom profile page built using GraphQL to retrieve student data from the Zone01 Kisumu platform.

## 🚀 Project Objectives

- Learn and practice using GraphQL (queries, nested queries, arguments).

- Build a profile UI to display your personal school information.

- Generate interactive SVG statistic graphs to visualize your academic journey.

- Implement JWT-based login using username/email and password.

- Host the final project online using platforms like GitHub Pages or Netlify.

## 🔐 Authentication

To access data from the GraphQL endpoint:

- Send a POST request to https://learn.zone01kisumu.ke/api/auth/signin using Basic Auth (Base64 encoded) to obtain a JWT.

- Use the JWT in future API requests with Bearer Authorization.

## ✅ Supports login with either:

- username:password

- email:password


🧾 Includes a logout feature and proper error messages for invalid login attempts.
📊 Data Visualization

Using data retrieved from:

    user, transaction, progress, result, and object tables

The app displays at least two SVG graphs, such as:

    📈 XP over time

    📘 XP by project

    ✅/❌ Project pass/fail ratio

    📊 Audit ratio

## 🧾 Profile UI Sections

The UI includes:

- User identification (name/login)

- XP progress

- Skills, audits, or grades

- 📊 A mandatory statistics section with SVG graphs

🖌️ UI/UX is custom-designed, with clean and intuitive navigation.
🔧 Technologies Used

- GraphQL + GraphiQL

- JWT Auth

- SVG for graphs

- HTML/CSS/JS (or a frontend framework of your choice)
    Hosted on [Your Host Here]

📚 Sample GraphQL Queries

```
# Basic user info
{
  user {
    id
    login
  }
}




# Nested query (result → user)
  {
  result {
    id
    user {
      login
    }
  }
 } 
 

# Query with argument
{
  object(where: { id: { _eq: 3323 }}) {
    name
    type
  }
}
```

## Installation
1. Clone this repository
```bash
git clone https://github.com/Siaka385/zone01Kisumu_profile_dashboard.git

cd zone01Kisumu_profile_dashboard
```

2. run it locally
```bash
python3 -m http.server
```


## 📦 Hosting


This app is publicly hosted at:
[link](https://zone01-kisumu-profile-dashboard-aaxq5ernj-siaka385s-projects.vercel.app/)