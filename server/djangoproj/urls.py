from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('about/',TemplateView.as_view(template_name="About.html")),
    path('login/',TemplateView.as_view(template_name="index.html")),
    path('register/',TemplateView.as_view(template_name="index.html")),
    path('djangoapp/', include('djangoapp.urls')),
    #hosts template path url
    path('hosts/', TemplateView.as_view(template_name="index.html")),
    #host by id template path url
    path('host/<int:host_id>',TemplateView.as_view(template_name="index.html")),
    #for posting review 
    path('postreview/<int:host_id>',TemplateView.as_view(template_name="index.html")),

    path('', TemplateView.as_view(template_name="Home.html"))] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
