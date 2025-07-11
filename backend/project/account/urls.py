from django.urls import path
from .views import StateListView, CityListView, JobRoleListView, TicketListView, UserProfileView

urlpatterns = [
    path('states/', StateListView.as_view(), name='state-list'),
    path('cities/', CityListView.as_view(), name='city-list'),
    path('roles/', JobRoleListView.as_view(), name='job-role-list'),
    path('tickets/', TicketListView.as_view(), name='ticket-list'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
