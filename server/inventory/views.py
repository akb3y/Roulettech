from django.views.decorators.csrf import csrf_exempt
from django.db.models import F
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .models import Inventory

@csrf_exempt
def index(request):
    return HttpResponse('Hello, world!')

@csrf_exempt
def get_all_items(request):
    inventory_list = Inventory.objects.all().values('id', 'name', 'quantity', 'description')
    return JsonResponse(list(inventory_list), safe=False)

@csrf_exempt
def create_item(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            quantity = request.POST.get('quantity')
            description = request.POST.get('description', '')

            if not name:
                return HttpResponseBadRequest("Name is required")
            if int(quantity) < 0:
                return HttpResponseBadRequest("Quantity cannot be negative")
            
            inventory = Inventory.objects.create(name=name, quantity=quantity, description=description)

            response_data = {
                'id': inventory.id,
                'name': inventory.name,
                'quantity': inventory.quantity,
                'description': inventory.description,
            }
            return JsonResponse(response_data, status=201)

        except ValueError:
            return HttpResponseBadRequest("Invalid quantity value")
    else:
        return HttpResponseBadRequest("Invalid request method")