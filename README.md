# Cinema-Application
The System contains:
1. Admins: Can access anything
2. Moderators: Can access some functionalities
3. Guests: Can access only public functionalities
-------------------------------------------------------------
# Set up:
To use the system, you can clone the repository and perform the "npm install" command to get all the node modules files and dependencies.
The database has already the first admin user with credentials username: "hamza1" , password: "123456"
-----------------------------------------------------------------
# Database:
The database used is Mongodb. The system consists of a collection of users: each has a type to differentiate between admins and moderators along with other attributes.
Another collection is the movies collection that consistes of all the added movies. and finally the photos.files and photos.chuncks collections that have all the uploaded images.
-----------------------------------------------------------------
# Admins
Admins can add other admins and moderators along with creating movies, viewing a list of moderators, and uploading images.
-----------------------------------------------------------------
# authentication
Whenever a user logs in a JWT is returned. The token is used to allow authorized users to perform some functionalities and prevent others.
The token must be attached to the request for the user to be allowed to perform the function. The method authenticate token is used to make sure a token exists meaning the user is either a moderator or an admin and in the functionalities that only an admin can perform, the authentication part in each route checks the type of the user to make sure the user is an admin and therefore can perorm the functionality.
---------------------------------------------------------------------
# Movies List
A list of all available movies can be accessed by any,even unregistered, user. The user can apply search by name, filtering by date range, and ordering by id, creation date, or show time date by setting the corresponding variables in the request body.
If the user wished to view the movies list in a several pages view, he/she can use the route specified for it, which enable all the previously mentioned search, filtering, and ordering options.   
-----------------------------------------------------------------------
# Note: The system could use several extra routes to make sense, but since this is a backend task that aims at testing only specific skill, I did not add extra routes or functionalities.