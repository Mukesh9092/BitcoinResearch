ARG UBUNTU_VERSION=18.04
ARG PYTHON=python3

FROM ubuntu:18.04

ENV LANG C.UTF-8

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y python3 python3-pip
RUN apt-get autoremove -y
RUN pip3 --no-cache-dir install --upgrade pip setuptools

# Some TF tools expect a "python" binary
RUN ln -s $(which python3) /usr/local/bin/python

RUN pip3 install --no-binary numpy scipy scikit-learn

RUN pip3 install tensorflow jupyter matplotlib enigma-catalyst pyfolio

RUN mkdir -p /tf && chmod -R a+rwx /tf
RUN mkdir /.local && chmod a+rwx /.local
WORKDIR /tf

EXPOSE 8888

CMD bash -c jupyter notebook --notebook-dir=/tf --ip 0.0.0.0 --no-browser --allow-root
