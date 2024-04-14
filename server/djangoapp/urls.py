
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name = 'djangoapp'
urlpatterns = [
    # # path for registration
     path(route='register',view=views.registration,name='registration'),
    # path for login
     path(route='login',view=views.login_user,name="login"),
     path(route='logout',view=views.logout_request,name='logout'),
     #path for get_rooms
     path(route='get_rooms',view=views.get_rooms,name='get_rooms'),
     #path to fetch from the backend api using the function in the view that function uses the get_request defined in the restapis
     path(route='get_hosts',view=views.get_hosts,name='get_hosts'),
     path(route='get_hosts/<str:state>',view=views.get_hosts,name='get_hosts_by_state'),
     #host details from the backend url
     path(route='host/<int:host_id>', view=views.get_host_details, name='host_details'),
    # path for host reviews view
     path(route='reviews/host/<int:host_id>', view=views.get_host_reviews, name='host_details'),
    # path for add a review view
     path(route='add_review', view=views.add_review, name='add_review'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
