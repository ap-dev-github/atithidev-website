from django.db import models
from django.utils.timezone import now



#Amenities Model
class Amenities(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    def __str__(self):
        return self.name  # Return the name as the string representation
    
#Room model 
class Room(models.Model):
    amenities = models.ForeignKey(Amenities, on_delete=models.CASCADE)  # Many-to-One relationship
    name = models.CharField(max_length=100)
    ROOM_TYPES = [
        ('AC 1 BED', 'AC 1 BED'),
        ('NON/AC 1 BED', 'NON/AC 1 BED'),
        ('AC 2 BED', 'AC 2 BED'),
        ('NON/AC 2 BED', 'NON/AC 2 BED'),
       
    ]
    type = models.CharField(max_length=20, choices=ROOM_TYPES, default='AC')
    
    # Other fields as needed
    def __str__(self):
        return self.name  # Return the name as the string representation


