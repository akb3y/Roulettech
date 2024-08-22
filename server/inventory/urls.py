from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all/', views.get_all_items, name='all'),
    path('create/', views.create_item, name='create'),
]