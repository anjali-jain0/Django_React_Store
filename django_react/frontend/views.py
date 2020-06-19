from django.shortcuts import render
from .models import Person

# def index(request):
# 	return render(request, 'frontend/index.html')

def get_person(request):
	persons = Person.objects.all()
	return render(request,'frontend/index.html',{'persons':persons})

