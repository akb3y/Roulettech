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