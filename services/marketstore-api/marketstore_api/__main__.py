import logging
from os import environ

import pymarketstore as mstore
from aiohttp import web

MARKETSTORE_API_HOST = str(environ["MARKETSTORE_API_HOST"])
MARKETSTORE_API_PORT_IN = int(environ["MARKETSTORE_API_PORT_IN"])

MARKETSTORE_HOST = str(environ["MARKETSTORE_HOST"])
MARKETSTORE_PORT = int(environ["MARKETSTORE_PORT"])

logging.basicConfig(level=logging.DEBUG)

mstore_client = mstore.Client(
    endpoint="http://%s:%s/rpc" % (MARKETSTORE_HOST, MARKETSTORE_PORT)
)
app = web.Application()


async def handleQuery(request):
    asset = request.match_info.get("asset")
    period = request.match_info.get("period")
    kind = request.match_info.get("kind")
    start = request.match_info.get("start")
    end = request.match_info.get("end")

    print('handleQuery:asset', asset)
    print('handleQuery:period', period)
    print('handleQuery:kind', kind)
    print('handleQuery:start', start)
    print('handleQuery:end', end)

    response = (
        mstore_client.query(
            mstore.Params(asset, period, type=kind, start=start, end=end)
        )
        .first()
        .df()
        .to_dict()
    )

    return web.Response(text=response)


async def handleMarkets(request):
    print('handleMarkets')
    result = mstore_client.list_symbols()
    result.sort()

    return web.Response(text=result)


app.add_routes(
    [
        web.get("/query/{asset}/{period}/{kind}/{start}/{end}", handleQuery),
        web.get("/markets", handleMarkets),
    ]
)


if __name__ == "__main__":
    web.run_app(app, host=MARKETSTORE_API_HOST, port=MARKETSTORE_API_PORT_IN)

    print("Started")
