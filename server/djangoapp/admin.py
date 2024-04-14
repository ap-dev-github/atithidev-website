from django.contrib import admin
from .models import Amenities, Room

class RoomInline(admin.StackedInline):
    model = Room
    extra = 3  # Number of extra forms to display

class AmenitiesAdmin(admin.ModelAdmin):
    inlines = [RoomInline]

admin.site.register(Amenities, AmenitiesAdmin)
admin.site.register(Room)