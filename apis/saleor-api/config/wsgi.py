"""WSGI config for saleor project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.
"""
import os, sys

activationScriptFilename = os.path.join('PATH_TO_VIRTUAL_ENV_PLACEHOLDER', 'bin', 'activate_this.py')
try:
  # the PATH_TO_VIRTUAL_ENV variable is defined by our jps
  exec(open(activationScriptFilename).read())
except IOError:
  sys.stderr.write("Couldn't read file: ", activationScriptFilename)

# TODO: is this line really necessary?
sys.path.append(os.path.join(os.environ['HOME'], 'ROOT'))
os.environ['SECRET_KEY'] = 'SECRET_KEY_PLACEHOLDER'
os.environ['ALLOWED_HOSTS'] = 'ALLOWED_HOSTS_PLACEHOLDER'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'saleor.settings')

# This application object is used by any WSGI server configured to use this
# file. This includes Django's development server, if the WSGI_APPLICATION
# setting points here.
from django.core.wsgi import get_wsgi_application  # noqa
application = get_wsgi_application()
