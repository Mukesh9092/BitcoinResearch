# Test

This is my architecture, ever evolving ..

# Start it

    $ docker-compose up

# UML
http://yuml.me/diagram/scruffy/class/edit/[Internet] <-> [Proxy], [Proxy] <-> [API], [Proxy] <-> [Web], [Proxy] <-> [Prisma], [Web] <-> [API], [Web] <-> [Prisma], [API] <-> [Prisma], [Prisma] <-> [PostgreSQL]

# Links
- [http://localhost:8080/dashboard](Traefik Proxy)
- [http://postgresql-admin.localtest.me](PostgreSQL Admin)
- [http://prisma.localtest.me](Prisma GraphQL)
- [http://tensorflow.localtest.me](Tensorflow)
- [http://web.localtest.me]("The Dashboard")

# Machine Learning

I have a Recurrent Neural Network that approximates the close price of tomorrow (financial data (Cryptocurrencies)).

## Current Situation

```
model = ks.models.Sequential()
model.add(ks.layers.LSTM(units=4, activation='sigmoid', input_shape=(None, 1)))
model.add(ks.layers.Dense(units=1))
model.compile(
    optimizer='adam',
    loss='mean_squared_error',
    metrics=['accuracy']
)
```

- The `x_train` value is a list of close prices for one asset.
- The `y_train` value is the same list shifted one to the right, such that `y_train[i] == x_train[i - 1]`.

![Test](https://i.imgur.com/LuMiAGl.png)

## First Goal

- 1] How do I change the network so that I can have multiple time series as inputs (e.g. Close and Volume) and one as output (Close)?
- 2] How do I place a trade with a prediction of the close price?
  - 2.1] Does the prediction price cross the actual price? Could you consider this a cross indicator?
  - 2.2] What happens (to the backtest) if you base the SMA Cross on the prediction line instead of the close line?
  - 2.3] What happens if you increase the prediction period from one days to 7 days?

## Eventual Goal

Approximating the direction ahead of time is a good idea but it has some drawbacks:
- The scope of the network is one asset over time. I'd have to create a network per asset (140 or so).
- Making buys/sells/closes would still be a different process involving a "Backtest" or "Live Trade" software/environment to use the trained AI (per asset) in combination with Technical Analysis functions to decide the moment to buy/sell.

What I want to do is to look at all assets over time:
- The Universe is the list of Assets that are tradeable and interesting.
- The Distribution is a list numbers that add up to 1. They are the percentages of the Cash distribution over the Universe.
- The Returns are the amount of Base Currency (BTC) that are expected to be Cashed from all Orders.
  - Every Distribution has a Return. Because during Backtesting we know today's prices and tomorrow's prices, we can calculate the Return for each Distribution.
- The input of the network would be the Open, High, Low, Close and Volume of the Universe.
- The output of the network would be the optimal Distribution for that Bar.
  
Questions:
- 4] Given the Open, High, Low, Close and Volume of 5 assets of yesterday and today how do you find the highest non-negative Distribution?
- 5] Wouldnt it be more profitable (but more risky!) to put 100% of the cash in 1 Asset at a time (the one that moves most)?
- 6] If you make a Distribution according to Risk, how do you quantify / calculate Risk?
  - 6.1] Besides things like "Keep X% in the bank for emergencies" or "Don't spend more then X% on one asset" or "spend `Cash * 1 / AssetAmount`"?
