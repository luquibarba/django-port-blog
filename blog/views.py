from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
from blog.models import Post, Comment, Category
from blog.forms import CommentForm

def blog_index(request):
    posts = Post.objects.all().order_by("-created_on")
    categories = Category.objects.all()
    context = {
        "posts": posts,
        "categories": categories,
    }
    return render(request, "blog/index.html", context)

def blog_category(request, category):
    posts = Post.objects.filter(
        categories__name__contains=category
    ).order_by("-created_on")
    categories = Category.objects.all()
    context = {
        "category": category,
        "posts": posts,
        "categories": categories,
    }
    return render(request, "blog/index.html", context)

def blog_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = Comment(
                author=form.cleaned_data["author"],
                body=form.cleaned_data["body"],
                post=post,
            )
            comment.save()
            return HttpResponseRedirect(request.path_info)
    
    comments = Comment.objects.filter(post=post).order_by('created_on')
    categories = Category.objects.all()
    
    context = {
        "post": post,
        "comments": comments,
        "form": CommentForm(),
        "posts": [post],  # Para mantener compatibilidad con el template
        "categories": categories,
    }
    
    return render(request, "blog/index.html", context)

@csrf_exempt
@require_POST
def add_comment_ajax(request):
    """Vista AJAX para agregar comentarios sin recargar la página"""
    try:
        data = json.loads(request.body)
        post_id = data.get('post_id')
        author = data.get('author')
        body = data.get('body')
        
        if not all([post_id, author, body]):
            return JsonResponse({'error': 'Datos incompletos'}, status=400)
        
        post = get_object_or_404(Post, pk=post_id)
        
        comment = Comment.objects.create(
            author=author,
            body=body,
            post=post
        )
        
        return JsonResponse({
            'success': True,
            'comment': {
                'author': comment.author,
                'body': comment.body,
                'date': comment.created_on.strftime('%d de %B de %Y a las %H:%M')
            }
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_post_data_ajax(request, pk):
    """Vista AJAX para obtener datos completos del post"""
    try:
        post = get_object_or_404(Post, pk=pk)
        comments = Comment.objects.filter(post=post).order_by('created_on')
        
        comments_data = [{
            'author': comment.author,
            'body': comment.body,
            'date': comment.created_on.strftime('%d de %B de %Y a las %H:%M')
        } for comment in comments]
        
        categories_names = [cat.name for cat in post.categories.all()]
        
        return JsonResponse({
            'title': post.title,
            'body': post.body,
            'image': post.image.url if post.image else None,
            'date': post.created_on.strftime('%d de %B de %Y'),
            'categories': ', '.join(categories_names),
            'comments': comments_data
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)