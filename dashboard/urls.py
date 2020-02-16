from django.urls import path
from . import views
urlpatterns = [
  path("", views.pivot_charts),
  path("data", views.pivot_data, name="pivot_data"),
  path("books/<int:id>", views.get_single_book)
]