import json
from saleor.account.models import User

with open('user-data.json') as file:
    producers = json.load(file)['producers']

for producer in producers:
    user = User.objects.create(email=producer['email'])
    user.set_password(producer['password'])
    user.save()
