# ComponentBasedSoftwareEngineering

### Q1. The application contains two main components named User and File.

#### 1. User Component 
The User component contains details of each user who will be using the application. This 
component is reusable by any other features which will be implemented in the future to act as 
the user allowing the application users to interact with those other features and to share user 
data with them instead of implementing a user feature inside the new features.
e.g.: If a feature which manages employee expenses is introduced, then the User component can 
be used to connect with the expense records of each user who is using the application.
#### 2. File Component

The File component contains files with a reference to whatever record the filed is tied to. This 
allows multiple components to use the File component when storing files related to their records.
e.g.: The users have profile pictures. Each user’s profile picture is tied with the user’s username 
in File component which it manages as a unique identifier. If there is an expense component, then 
the receipts related to expense records can be uploaded to the system along with an identifier 
for the expense record.

### Q2. The application contains 5 service endpoints. Out of which I will discuss the 2 endpoints related to User component.
The services are:  
- Search and find a user based on the username.
- Add a new user.

[Demonstration](https://drive.google.com/file/d/1oJiE4rIiTP37GGtt-_DouG694kERFvdc/view?usp=sharing)  

***

# Setting Up Project

1. Clone the master branch.
2. Open up api and client folders in separate command prompt windows.
3. Install/Update any dependencies required for the project. ([Node.js](https://nodejs.org/en) is a pre-requisite).
4. Update MONGO_URI and DB_NAME in the .env file according to your local mongo db database.
5. Start both projects using "npm start" command.
