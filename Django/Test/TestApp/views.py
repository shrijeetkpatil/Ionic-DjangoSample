from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class AllItems(APIView):
    
    def get(self, request, *args, **kwargs):

        items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

        return Response({
            "items" : items
        })


    def post(self, request, *args, **kwargs):

        item = request.data
        print('Selected Item ===> ', item['selected_item'])

        return Response({
            "selected_item" : item['selected_item']
        })


