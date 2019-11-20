from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

    # apiclient on client-side will request this adress later
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),

    
    # index.html file will be our root template. When a user opens our webste,
    # this file will be sent by server at first. After then, api requests
    # will directed above address.

    # (it points to ~/Blog/djr/templates/index.html)
    # (currently there is no file, webpack production bundle will come here )
    path("", TemplateView.as_view(template_name="index.html")),
]