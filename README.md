This application will find coaches, and the user can contact the coach. This application is built using Vue.js and Firebase as the backend.


Business Requirement
1) User should see all the available coach
2) User can view coach details
3) User can register as a coach
4) User can contact coach
5) Coach can view incoming request


Data
coaches
     -id
     -firstname
     -lastname
     -email
     -description
     -hourlyRate
     -area of expertise


requests
    - id
    - coachID FK
    - message
    - userEmail


To run this application
1) npm install
2) npm run serve