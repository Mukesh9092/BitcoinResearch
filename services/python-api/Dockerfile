FROM python:3

RUN mkdir -p /service
WORKDIR /service

ADD . /service

RUN pip3 install poetry
RUN poetry install

CMD ["python3", "python_api"]