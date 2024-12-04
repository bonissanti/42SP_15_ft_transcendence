from django.urls import include # for include('app.urls')
from django.urls import path
from . import views

urlpatterns = [
  path('', views.index, name='index'),
]
