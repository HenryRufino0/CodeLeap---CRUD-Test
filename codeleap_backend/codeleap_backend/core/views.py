from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_datetime')
    serializer_class = PostSerializer

class PostUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
