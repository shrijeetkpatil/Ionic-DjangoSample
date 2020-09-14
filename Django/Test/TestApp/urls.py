from django.urls import path
from . import views

urlpatterns = [

    path('all_items/', views.AllItems.as_view()),
]