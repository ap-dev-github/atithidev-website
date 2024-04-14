
from .models import Amenities, Room
def initiate():
    amenities_data = [
  
    {"name": "private bathroom", "description": "Each room has its own private bathroom."},
    {"name": "kitchen", "description": "A kitchen is available for cooking purposes."},
    {"name": "shared facilities", "description": "Common facilities shared among multiple rooms."},
    {"name": "shared bathroom", "description": "Bathroom facilities shared among multiple rooms."},
    {"name": "private pool", "description": "A dedicated private pool available."},
    {"name": "gym", "description": "A gymnasium or fitness center available for exercise."},
    {"name": "city view", "description": "Scenic view of the city from the room."},
    {"name": "outdoor shower", "description": "Shower facilities located outdoors."},
    {"name": "hammock", "description": "A suspended bed or chair made of fabric or rope."},
    {"name": "fireplace", "description": "A fireplace for heating or ambiance."},
  
    ]
    amenities_instances = []
    for data in amenities_data:
        amenities_instances.append(Amenities.objects.create(name=data['name'], description=data['description']))

    #  Room instances with the corresponding amenities instances
    room_data = [
    {"name": "Shared Dormitory", "type": "AC 1 BED", "amenities": amenities_instances[0]},
    {"name": "Private Cabin", "type": "NON/AC 2 BED", "amenities": amenities_instances[0]},
    {"name": "Luxury Suite", "type": "AC 2 BED", "amenities": amenities_instances[0]},
    {"name": "Beach Bungalow", "type": "NON/AC 1 BED", "amenities": amenities_instances[0]},
    {"name": "Rustic Cottage", "type": "AC 1 BED", "amenities": amenities_instances[1]},
    {"name": "Urban Loft", "type": "NON/AC 2 BED", "amenities": amenities_instances[1]},
    {"name": "Family House", "type": "AC 2 BED", "amenities": amenities_instances[1]},
    {"name": "Country Farmhouse", "type": "NON/AC 1 BED", "amenities": amenities_instances[1]},
    {"name": "Cozy Chalet", "type": "AC 1 BED", "amenities": amenities_instances[2]},
    {"name": "Historic Manor", "type": "NON/AC 2 BED", "amenities": amenities_instances[2]}
     ]

    

    for data in room_data:
            Room.objects.create(name=data['name'], amenities=data['amenities'], type=data['type'])