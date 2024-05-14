FROM registry.access.redhat.com/ubi9/python-39:latest

WORKDIR /python-docker
ENV PORT 8080
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
EXPOSE 8080


COPY . .

CMD ["sh","-c","python3 -m flask run --host=0.0.0.0 --port=${PORT}"]