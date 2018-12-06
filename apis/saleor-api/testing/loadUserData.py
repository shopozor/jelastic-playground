import json
from saleor.account.models import User

with open('user-data.json') as file:
    users = json.load(file)['users']

for user in users:
    u = User.objects.create(email=user['email'])
    u.set_password(user['password'])
    u.save()
