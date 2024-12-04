from django.contrib import admin

# Register your models here.

from .models import Author, Genre, Book, BookInstance

# admin.site.register(Author)
class AuthorAdmin(admin.ModelAdmin):
  list_display = ('last_name', 'first_name', 'date_of_birth', 'date_of_death')

admin.site.register(Author, AuthorAdmin)

# admin.site.register(Book)
# admin.site.register(BookInstance)
class BookAdmin(admin.ModelAdmin):
  list_display = ('title', 'author', 'display_genre')

class BookInstanceAdmin(admin.ModelAdmin):
  pass


admin.site.register(Genre)
# admin.site.register(Language)
