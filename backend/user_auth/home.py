from django.shortcuts import redirect, render   #to use render() and requests()

def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'home.html')
