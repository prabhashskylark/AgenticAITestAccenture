from django.core.management.base import BaseCommand
from django.conf import settings
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
import pymongo
from datetime import datetime

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Starting population of octofit_db...')

        # Clear existing data. Use pymongo to drop collections to avoid
        # issues with mismatched primary key types in Djongo objects.
        self.stdout.write('Deleting existing data (dropping collections if present)...')
        try:
            mongo_uri = settings.DATABASES['default']['CLIENT'].get('host', 'mongodb://127.0.0.1:27017')
            client = pymongo.MongoClient(mongo_uri)
            db_name = settings.DATABASES['default'].get('NAME', 'octofit_db')
            db = client[db_name]
            for col in ['activities', 'leaderboard', 'workouts', 'users', 'teams']:
                if col in db.list_collection_names():
                    db.drop_collection(col)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not drop collections via pymongo: {e}'))

        # Create teams
        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (super heroes)
        self.stdout.write('Creating users...')
        users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': marvel},
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': marvel},
            {'name': 'Thor', 'email': 'thor@marvel.com', 'team': marvel},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': dc},
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': dc},
        ]

        created_users = []
        for u in users:
            created_users.append(User.objects.create(name=u['name'], email=u['email'], team=u['team']))

        # Activities
        self.stdout.write('Creating activities...')
        Activity.objects.create(user=created_users[0], type='Running', duration=30)
        Activity.objects.create(user=created_users[1], type='Cycling', duration=45)
        Activity.objects.create(user=created_users[3], type='Swimming', duration=40)

        # Workouts
        self.stdout.write('Creating workouts...')
        w1 = Workout.objects.create(name='Hero Training', description='Intense workout for heroes')
        w1.suggested_for.set([marvel])
        w2 = Workout.objects.create(name='Night Vigil', description='Stealth training for night heroes')
        w2.suggested_for.set([dc])

        # Leaderboard
        self.stdout.write('Creating leaderboard entries...')
        Leaderboard.objects.create(team=marvel, points=300)
        Leaderboard.objects.create(team=dc, points=250)

        # Create unique index on users.email using pymongo to ensure uniqueness at DB level
        try:
            self.stdout.write('Ensuring unique index on users.email...')
            mongo_uri = settings.DATABASES['default']['CLIENT'].get('host', 'mongodb://127.0.0.1:27017')
            client = pymongo.MongoClient(mongo_uri)
            db_name = settings.DATABASES['default'].get('NAME', 'octofit_db')
            db = client[db_name]
            db.users.create_index([('email', pymongo.ASCENDING)], unique=True)
            self.stdout.write(self.style.SUCCESS('Unique index on users.email ensured.'))
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not ensure unique index: {e}'))

        self.stdout.write(self.style.SUCCESS('Database population complete.'))
