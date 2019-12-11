FROM python:3.7

RUN mkdir -p /service
WORKDIR /service
ADD pyproject.toml /service
ADD poetry.lock /service

RUN pip3 install poetry
RUN poetry config settings.virtualenvs.create false

RUN poetry install

ADD . /service

CMD ["python3", "marketstore_api"]
