from django.shortcuts import redirect, render   #to use render() and requests()
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    user = request.session.get('user')
    if not user:
        return redirect('/')
    return render(request, 'dashboard.html', {'user': user})
