import os
import time

import pymarketstore as mstore

from sanic import Sanic
from sanic.response import json

MARKETSTORE_API_HOST = str(os.environ['MARKETSTORE_API_HOST'])
MARKETSTORE_API_PORT_IN = int(os.environ['MARKETSTORE_API_PORT_IN'])
MARKETSTORE_API_WORKERS = int(os.environ['MARKETSTORE_API_WORKERS'])

MARKETSTORE_HOST = str(os.environ['MARKETSTORE_HOST'])
MARKETSTORE_PORT = int(os.environ['MARKETSTORE_PORT'])

mstore_client = mstore.Client(endpoint='http://%s:%s/rpc' % (MARKETSTORE_HOST, MARKETSTORE_PORT))
http_server = Sanic()

@http_server.route("/query/<asset>/<period>/<type>/<start>/<end>")
async def test(request, asset, period, type, start, end):
    params = mstore.Params(asset, period, type, start=start, end=end)
    response = mstore_client.query(params)
    result = response.first().df().to_dict()
    return json(result)

@http_server.route("/markets")
async def test(request):
    result = mstore_client.list_symbols()
    result.sort()
    return json(result)

# @http_server.route("/write/<asset>/<period>/<type>")
# async def test(request, asset, period, type):
#     mstore_client.write([], '%s/%s/%s' % (asset, period, type))
#     return text(
#         '{}',
#         headers={'Content-Type': 'application/json'},
#         status=200
#     )

if __name__ == "__main__":
    http_server.run(host=MARKETSTORE_API_HOST, port=MARKETSTORE_API_PORT_IN, workers=MARKETSTORE_API_WORKERS)
