"""
Management command to initialize default data
"""

from django.core.management.base import BaseCommand
from api.models import TaskStatus


class Command(BaseCommand):
    help = 'Initialize default data for the application'
    
    def handle(self, *args, **options):
        # Create default task statuses
        statuses = [
            ('pending', 'В ожидании', '#fbbf24'),
            ('in_progress', 'В процессе', '#3b82f6'),
            ('completed', 'Завершена', '#10b981'),
            ('cancelled', 'Отменена', '#ef4444'),
        ]
        
        for name, display_name, color in statuses:
            status, created = TaskStatus.objects.get_or_create(
                name=name,
                defaults={
                    'description': display_name,
                    'color': color
                }
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created status: {display_name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Status already exists: {display_name}')
                )
        
        self.stdout.write(
            self.style.SUCCESS('Successfully initialized default data')
        )
