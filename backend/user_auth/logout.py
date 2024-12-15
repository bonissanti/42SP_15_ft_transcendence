from django.contrib import messages
from django.contrib.auth import logout as auth_logout
from django.shortcuts import redirect, render   #to use render() and requests()

def logout(request):
    auth_logout(request)
    messages.success(request, "You have been logged out successfully.")
    return render(request, 'logout.html')


