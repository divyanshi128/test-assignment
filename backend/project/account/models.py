from django.db import models


class State(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')

    def __str__(self):
        return f"{self.name}, {self.state.name}"

class JobRole(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Ticket(models.Model):
    TICKET_TYPES = [
        ('Service', 'Service'),
        ('Application', 'Application'),
        ('LIMS', 'LIMS'),
    ]

    STATUS_CHOICES = [
        ('Resolved', 'Resolved'),
        ('Pending', 'Pending'),
    ]

    ticket_id = models.CharField(max_length=20, unique=True)
    type = models.CharField(max_length=20, choices=TICKET_TYPES)
    assigned_to = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ticket_id

from django.contrib.auth.models import User  # If you're using Django's built-in User model

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # optional: if you're using auth
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    job_role = models.ForeignKey(JobRole, on_delete=models.SET_NULL, null=True)
    state = models.ForeignKey(State, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
