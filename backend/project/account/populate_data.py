from .models import State, City, JobRole

def run():
    # States and Cities
    states_with_cities = {
        "California": ["Los Angeles", "San Francisco", "San Diego"],
        "Texas": ["Houston", "Dallas", "Austin"],
        "New York": ["New York City", "Buffalo", "Rochester"],
        "Florida": ["Miami", "Orlando", "Tampa"],
        "Illinois": ["Chicago", "Springfield", "Naperville"],
    }

    for state_name, cities in states_with_cities.items():
        state, created = State.objects.get_or_create(name=state_name)
        for city_name in cities:
            City.objects.get_or_create(name=city_name, state=state)

    # Job Roles
    job_roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Data Scientist",
        "UI/UX Designer",
        "DevOps Engineer",
        "Product Manager",
        "Mobile Developer",
        "Machine Learning Engineer",
        "System Administrator",
    ]

    for role in job_roles:
        JobRole.objects.get_or_create(title=role)

    print("✅ Data population complete.")


from .models import Ticket
from random import choice
import string

names = ['Arun Ahlawat', 'Vinay Mishra', 'Lokeshendra Narayan', 'Amit Yadav', 'Neha Sharma']
types = ['Service', 'Application', 'LIMS']
statuses = ['Resolved', 'Pending']

# Utility to generate random ticket IDs
def generate_ticket_id(index):
    return f"T-{10000 + index}"

# Create 30 tickets
for i in range(30):
    ticket = Ticket.objects.create(
        ticket_id=generate_ticket_id(i),
        type=choice(types),
        assigned_to=choice(names),
        status=choice(statuses)
    )
    print(f"Created ticket: {ticket.ticket_id}")
