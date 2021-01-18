# Rest Api with SQL and Express
 This is the first part (backend) of my final project for the Treehouse Techdegree. It's a simple Rest Api with 2 sql tables. 

You can create users and courses. for this purpose, authentication is carried out for certain queries. e.g. only your own user data can be called up. for this, the email and password must match.

Validations are also built in. for example, a valid email address must be transferred that does not yet exist in the database.

### To start the app
- navigate to the app folder
- npm install
- Create the database using npm run seed
- npm start

### To test the app
- start postman
- import the RESTAPI.postman_collection.json

So you have all calls as a collection in postman to test the app.
