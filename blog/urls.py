# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.blog_index, name="blog_index"),
    path("category/<category>/", views.blog_category, name="blog_category"),
    path("post/<int:pk>/", views.blog_detail, name="blog_detail"),
    path("ajax/post/<int:pk>/", views.get_post_data_ajax, name="get_post_data_ajax"),
    path("ajax/add-comment/", views.add_comment_ajax, name="add_comment_ajax"),
]