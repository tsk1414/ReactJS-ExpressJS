Vaccine Verification Web Application

Simple CRUD application to simulate a vaccine verification web portal to allow patients and health administrators to keep track of a patient’s vaccine status and information. 
The front-end uses ReactJS to populate all pages whereas the back-end uses ExpressJS to receive requests and return data.
The back-end sends requests to a mySQL database hosted on AWS Relational Database Service. 
The first page to load is the EZ-Verify page where a patient ID is required. 
The only information shown is the patient’s vaccination status and all private information is hidden. 
This is so, because there are 2 tables within the database. One table to hold a patient’s vaccination status and dates while the other table holds the patient’s private information (birthday, address, etc.).
