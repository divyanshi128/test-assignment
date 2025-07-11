from rest_framework import generics
from .models import State, City, JobRole, Ticket, UserProfile
from .serializer import StateSerializer, CitySerializer, JobRoleSerializer, TicketSerializer, UserProfileSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class StateListView(generics.ListAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class CityListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class JobRoleListView(generics.ListAPIView):
    queryset = JobRole.objects.all()
    serializer_class = JobRoleSerializer


class TicketListView(generics.ListAPIView):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)

            return self.get_paginated_response({
                "tickets": serializer.data,
                "counts": {
                    "all": queryset.count(),
                    "resolved": queryset.filter(status="Resolved").count(),
                    "pending": queryset.filter(status="Pending").count(),
                }
            })

        # If no pagination
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "tickets": serializer.data,
            "counts": {
                "all": queryset.count(),
                "resolved": queryset.filter(status="Resolved").count(),
                "pending": queryset.filter(status="Pending").count(),
            }
        })





class UserProfileView(APIView):
    def get(self, request):
        profile = UserProfile.objects.first()  # Replace with user-specific query later
        if profile:
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        return Response({})  # No profile yet

    def post(self, request):
        profile = UserProfile.objects.first()  # Replace with user-specific query later
        if profile:
            serializer = UserProfileSerializer(profile, data=request.data)
        else:
            serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
