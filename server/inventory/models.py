from django.db import models

class Inventory(models.Model):
    name = models.CharField(max_length=20)
    quantity = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return f"{self.name}: {self.description}"
    
    def get_quantity(self):
        return self.quantity