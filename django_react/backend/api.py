from backend.models import Student
from rest_framework import viewsets, permissions
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = StudentSerializer
    queryset = Student.objects.all()