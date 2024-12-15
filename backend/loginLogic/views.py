# Create your views here.
import requests, os
import sys

from django.shortcuts import redirect, render   #to use render() and requests()
from django.conf import settings
from django.http import JsonResponse
from dotenv import load_dotenv

# test
from urllib.parse import urlencode, quote_plus


load_dotenv()
def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
REDIRECT_URI = os.environ.get('REDIRECT_URI')

OAUTH_URL = "https://api.intra.42.fr/oauth/authorize?" + urlencode({
	'client_id': os.environ.get('CLIENT_ID'),
	'redirect_uri': os.environ.get('REDIRECT_URI'),
	'response_type': 'code'
	},
	quote_via=quote_plus
)

eprint(f"{OAUTH_URL}")

def requestAuth42(request):
    return redirect(OAUTH_URL)

def callbackAuth(request):
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'Error': 'Authorization failed'}, status=400)
    response = fetchAccessToken(code)
    return response

def fetchAccessToken(code):
    token_url = "https://api.intra.42.fr/oauth/token"
    data = {
        'grant_type': 'authorization_code',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'redirect_uri': REDIRECT_URI,
    }

    token_response = requests.post(token_url, data=data, timeout=30)
    token_data = token_response.json()
    access_token = token_data.get('access_token')

    if not access_token:
        return JsonResponse({'Error': 'Failed to obtain access_token'}, status=400)

    urlInfoMe = "https://api.intra.42.fr/v2/me"
    headers = {'Authorization': f'Bearer {access_token}'}

    responseResouces = requests.get(urlInfoMe, headers=headers).json()

    username = responseResouces.get('login')
    if not username:
        return JsonResponse({'Error': 'Invalid user data'}, status=400)
    return JsonResponse({'Success': 'User authenticated', 'username': username})

def logout(request):
    request.session.flush()
    return redirect(settings.LOGOUT_REDIRECT_URL)


# def dashboard(request):
#     user = requests.session.get('user')
#     if not user:
#         return redirect('/')
#     return render(request, 'dashboard.html', {'user': user})


