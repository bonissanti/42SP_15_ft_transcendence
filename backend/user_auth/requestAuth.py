import requests, os
import logging
import sys

from django.shortcuts import redirect, render   #to use render() and requests()
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.models import User
from django.db import IntegrityError
from dotenv import load_dotenv
from urllib.parse import urlencode, quote_plus

from user_auth.dashboard import dashboard

logger = logging.getLogger(__name__)

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

def requestAuth42(request):
    return redirect(OAUTH_URL)

def callbackAuth(request):
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'Error': 'Authorization failed'}, status=400)
    fetchAccessToken(code, request)
    return dashboard(request)

def fetchAccessToken(code, request):
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

    userInfo = requests.get(urlInfoMe, headers=headers).json()

    #add Log the user in (Django session management), because it has more advanced methods

    username = userInfo.get('login')
    if not username:
        return JsonResponse({'Error': 'Invalid user data'}, status=400)

    User = get_user_model()
    user, created = User.objects.get_or_create(username=username)
    login(request, user)

    request.session['user'] = userInfo
    return redirect(settings.LOGIN_REDIRECT_URL)

