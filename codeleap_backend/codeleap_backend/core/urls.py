from django.urls import path
from .views import PostListCreateView, PostUpdateDeleteView

urlpatterns = [
    path('careers/', PostListCreateView.as_view(), name='post-list-create'),
    path('careers/<int:pk>/', PostUpdateDeleteView.as_view(), name='post-update-delete'),
]
