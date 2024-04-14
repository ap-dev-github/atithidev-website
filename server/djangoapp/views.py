
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from .populate import initiate
from .models import  Room,Amenities
from .restapis import get_request, analyze_review_sentiments, post_review


# Get an instance of a logger
logger = logging.getLogger(__name__)


#view to get the rooms
def get_rooms(request):
    count = Room.objects.filter().count()
    print(count)
    if(count == 0):
        initiate()
    rooms = Room.objects.select_related('amenities')
    rooms_data = []
    for room in rooms:
        rooms_data.append({"Room": room.name, "Amenities": room.amenities.name})
    return JsonResponse({"Rooms":rooms_data})

# `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)


def logout_request(request):
    logout(request)
    data={"username":""}
    return JsonResponse(data)



@csrf_exempt
def registration(request):
    context = {}
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    username_exist = False
    email_exist = False
    try:
        # Check if user already exists
        User.objects.get(username=username)
        username_exist = True
    except:
        # If not, simply log this is a new user
        logger.debug("{} is new user".format(username))
    # If it is a new user
    if not username_exist:
        # Create user in auth_user table
        user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name,password=password, email=email)
        # Login the user and redirect to list page
        login(request, user)
        data = {"userName":username,"status":"Authenticated"}
        return JsonResponse(data)
    else :
        data = {"userName":username,"error":"Already Registered"}
        return JsonResponse(data)
        


#fUNCTIONS TO COMMUNICATE WITH THE BACKEND API AND flask ai api (if want)


#get_hosts it will use th get_request defined in the restapis.py and communicate with backend api 
def get_hosts(request,state="All"):
    if(state=="All"):
        endpoint="/fetchHosts"
    else:
        endpoint="/fetchHosts/"+state
    hosts=get_request(endpoint)
    return JsonResponse({"status":200,"hosts":hosts})

# ...

#  `get_host_reviews` view to render the reviews of a host
def get_host_reviews(request, host_id):
    # if host id has been provided
    if(host_id):
        endpoint = "/fetchReviews/host/"+str(host_id)
        reviews = get_request(endpoint)
        for review_detail in reviews:
            response = analyze_review_sentiments(review_detail['review'])
            print(response)
            review_detail['sentiment'] = response['sentiment']
        return JsonResponse({"status":200,"reviews":reviews})
    else:
        return JsonResponse({"status":400,"message":"Bad Request"})

# view to render the host details
def get_host_details(request, host_id):
    if(host_id):
        endpoint='/fetchHost/'+str(host_id)
        host=get_request(endpoint)
        return JsonResponse({"status":200,"host":host})
    else:
        return JsonResponse({"status":400,"message":"Bad Request"})    



 #`add_review` view to submit a review
def add_review(request):
    if(request.user.is_anonymous==False):
        data=json.loads(request.body)
        try:
            response=post_review(data)
            return JsonResponse({"status":200})
        except:
            return JsonResponse({"status":401,"message":"Error in posting review"})
    else:
        return JsonResponse({"status":403,"message":"Unauthorized"})    
