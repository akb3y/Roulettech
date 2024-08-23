from django.db import models

class Inventory(models.Model):
    name = models.CharField(max_length=20)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.name}"
    
    def get_quantity(self):
        return self.quantity