from django.contrib import messages
from django.contrib.auth import logout as auth_logout
from django.shortcuts import redirect, render   #to use render() and requests()

def logout(request):
    if request.user.is_authenticated:
        request.user.is_online = False
        request.user.updateLastActivity()
        request.user.save()

    auth_logout(request)
    messages.success(request, "You have been logged out successfully.")
    return render(request, 'logout.html')


