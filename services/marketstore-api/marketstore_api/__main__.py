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
    logging.debug('handleQuery')

    asset = request.match_info.get("asset")
    period = request.match_info.get("period")
    kind = request.match_info.get("kind")
    start = request.match_info.get("start")
    end = request.match_info.get("end")

    logging.debug('handleQuery:asset %s', asset)
    logging.debug('handleQuery:period %s', period)
    logging.debug('handleQuery:kind %s', kind)
    logging.debug('handleQuery:start %s', start)
    logging.debug('handleQuery:end %s', end)

    response = (
        mstore_client.query(
            mstore.Params(asset, period, type=kind, start=start, end=end)
        )
        .first()
        .df()
        .to_dict()
    )

    logging.debug('handleQuery:response %s', response)

    return web.json_response(response)


async def handleMarkets(request):
    logging.debug('handleMarkets')

    result = mstore_client.list_symbols()
    result.sort()

    logging.debug('handleMarkets:result %s', result)

    return web.json_response(result)


app.add_routes(
    [
        web.get("/query/{asset}/{period}/{kind}/{start}/{end}", handleQuery),
        web.get("/markets", handleMarkets),
    ]
)


if __name__ == "__main__":
    web.run_app(app, host=MARKETSTORE_API_HOST, port=MARKETSTORE_API_PORT_IN)

    print("Started")
