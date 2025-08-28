from django.contrib import admin
from blog.models import Category, Comment, Post

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_on', 'last_modified')
    list_filter = ('categories', 'created_on', 'last_modified')
    search_fields = ('title', 'body')
    filter_horizontal = ('categories',)
    
    # Configuración para mostrar la imagen en el admin
    readonly_fields = ('created_on', 'last_modified')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'body', 'image')
        }),
        ('Categorización', {
            'fields': ('categories',)
        }),
        ('Fechas', {
            'fields': ('created_on', 'last_modified'),
            'classes': ('collapse',)
        }),
    )

class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_on')
    list_filter = ('created_on', 'post')
    search_fields = ('author', 'body', 'post__title')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)