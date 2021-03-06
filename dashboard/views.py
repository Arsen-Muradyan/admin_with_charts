from django.shortcuts import render
from django.core import serializers
from django.http import JsonResponse
import json
from .models import Book
# Create your views here.
def pivot_charts(request):
  books = Book.objects.all()
  return render(request, 'dashboard_with_charts.html', {
    "books":books
  })
def pivot_data(request):
  books = Book.objects.all()
  data = serializers.serialize("json", books)
  data = json.loads(data)
  for i in data:
    del i['pk']
    del i['model']
  data = json.dumps(data)
  return JsonResponse(data, safe=False)
def get_single_book(request, id):
  book = Book.objects.filter(pk=id)
  data = serializers.serialize("json", book)
  data = json.loads(data)
  for i in data:
    del i['pk']
    del i['model']
  data = json.dumps(data)
  return JsonResponse(data, safe=False)