from django.shortcuts import render
from django.core import serializers
from django.http import JsonResponse
from .models import Book
# Create your views here.
def pivot_charts(request):
  return render(request, 'dashboard_with_charts.html')
def pivot_data(request):
  books = Book.objects.all()
  data = serializers.serialize("json", books)
  return JsonResponse(data, safe=False)