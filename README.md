# atithidev-website
video walkthrough of the website is available on the link:  https://drive.google.com/file/d/1ZWJVsZtbd15ho0pAMKMBn-RrFigO4gkS/view?usp=drive_link 
SOME BASIC INFO ABOUT WEBSITE:-
This website is made using the microservice concept. Here we have used a Sentiment analyzer to analyze the emotions of the customers in real time.
IT Uses an express-based API that stores and fetches from the MongoDB database. We have populated some initial data in the databases.
Also, SQLite is used for user management and relational database models.
and a proxy is also used for communication between different APIs

HOW TO RUN THE WEBSITE?
Step 1:Run the Django server go to the server directory and write the below commands
pip install virtualenv
virtualenv djangoenv
source djangoenv/bin/activate

Step2:From server directory install the requirements needed for the website
python -m pip install -U -r requirements.txt
python manage.py makemigrations
python manage.py migrate --run-syncdb
python manage.py runserver

Step3:create the production ready build for the application by below commands 
Go to server/frontend 
npm install
npm run build 


Step4:Run the docker desktop 

Step5:for running the backend Express Api service go the database directory then
docker build . -t nodeapp
docker-compose up

Step6:for running the sentiment analyzer microservice go to server/djangoapp/microservices and create and run docker image 
docker build . -t nodeapp
docker-compose up

add the url of the database to .env file in the server/djangoapp if there is  no .env  there then create one and add below code to it 
backend_url='<paste backend api url here without forward slash>'
sentiment_analyzer_url='<paste the sentiment analyzer api link here with forwar slash>'


go to the 8000 port of the local host 
SUCCESS! you will see the website running like for any problem contact @ inbox.ayushpandey@gmail.com or linkedIn id @linkedap

THANKS FOR READING ....   :)






