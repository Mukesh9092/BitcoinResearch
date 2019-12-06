import logging
from os import environ

from aiohttp import web

PORT = int(environ['PYTHON_API_PORT_IN'])


async def handle(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)


app = web.Application()
app.add_routes([web.get('/', handle),
                web.get('/{name}', handle)])

logging.basicConfig(level=logging.DEBUG)

if __name__ == '__main__':
    web.run_app(app, port=PORT)

    print('Started!')
