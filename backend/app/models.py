from django.db import models

# Create your models here.
from django.urls import reverse
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower


class Genre(models.Model):
    name = models.CharField(
        max_length=200,
        unique=True,
        help_text="""Enter a book genre (e.g. Science Fiction,
            French Poetry, etc.)"""
    )

    def __str__(self) -> str:
        return self.name

    def get_absolute_url(self) -> str:
        return reverse('genre-detail', args=[str(self.id)])

    class Meta:
        constraints = [
            UniqueConstraint(
                Lower('name'),
                name='genre_name_case_insensitive',
                violation_error_message="""Genre already exists
                    (case insensitive match)"""
            ),
        ]


# isbn = international standard book number (for study)
class Book(models.Model):
    title: str = models.CharField(max_length=200)
    author: str = models.ForeignKey('Author', on_delete=models.RESTRICT,
                                    null=True)
    summary = models.TextField(
        max_length=1000,
        help_text="Enter a brief description of the book")
    isbn = models.CharField('ISBN', max_length=13,
                            unique=True,
                            help_text='13 Character <a'
                            'href="https://www.isbn-international.org'
                            '/content/what-isbn">ISBN number</a>')

    genre = models.ManyToManyField(
        Genre, help_text="Select a genre for this book")

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self) -> str:
        return reverse('book-detail', args=[str(self.id)])
