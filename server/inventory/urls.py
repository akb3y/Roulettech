from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all/', views.get_all_items, name='all'),
    path('create/', views.create_item, name='create'),
    path('<int:item_id>/increase/', views.increase_item, name='increase'),
    path('<int:item_id>/decrease/', views.decrease_item, name='decrease'),
    path('<int:item_id>/remove/', views.remove_item, name='remove'),
]
