from django.db import models

# Create your models here.


class Book(models.Model):
  title         = models.CharField(max_length=50)
  author        = models.CharField(max_length=50)
  price         = models.DecimalField(max_digits=5, decimal_places=2)
  selling_count = models.DecimalField(max_digits=5, decimal_places=2)
  created_at    = models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.title