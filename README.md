This project provides a RESTful API and a LinkedIn Chrome extension to match and display account data.

Features
API:

Login with username/password

Fetch companies with match scores

Update company status (e.g., "Target")

Chrome Extension:

Displays company name, match score, and status on LinkedIn profiles

Getting Started
1. Clone the Repo:
bash
Copy
Edit
git clone https://github.com/your-username/target-matching-solution.git

3. Set Up the API:
Navigate to target-api/
Install dependencies:
bash
Copy
Edit
npm install
Create a .env file for the PORT and JWT_SECRET
Start the server:
bash
Copy
Edit
npm start

4. Set Up the Chrome Extension:
Navigate to linkedin-widget/

Load the extension in Chrome:
Go to chrome://extensions/
Enable Developer mode

Click Load unpacked and select the linkedin-widget/ folder

API Endpoints
POST /login: Log in and get a token
GET /accounts: Get a list of companies with match scores
POST /accounts/:id/status: Update a company's status

Technologies Used
Backend: Node.js, Express, JWT
Frontend: JavaScript (Chrome Extension), HTML, CSS
