# Test

This is my architecture, ever evolving ..

# Start it

    $ docker-compose up

http://yuml.me/diagram/scruffy/class/edit/[Internet] <-> [Proxy], [Proxy] <-> [API], [Proxy] <-> [Web], [Proxy] <-> [Prisma], [Web] <-> [API], [Web] <-> [Prisma], [API] <-> [Prisma], [Prisma] <-> [PostgreSQL]

# Links
- [http://localhost:8080/dashboard](Traefik Proxy)
- [http://postgresql-admin.localtest.me](PostgreSQL Admin)
- [http://prisma.localtest.me](Prisma GraphQL)
- [http://tensorflow.localtest.me](Tensorflow)
- [http://web.localtest.me]("The Dashboard")
