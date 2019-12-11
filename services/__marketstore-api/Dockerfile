FROM node:latest

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install -y python3 python3-pip
RUN pip3 install --upgrade pip setuptools

RUN pip3 install numpy
RUN pip3 install git+git://github.com/channelcat/sanic.git@master
RUN pip3 install sanic-admin
RUN pip3 install pymarketstore

RUN mkdir -p /service
WORKDIR /service

CMD sanic-admin server.py
