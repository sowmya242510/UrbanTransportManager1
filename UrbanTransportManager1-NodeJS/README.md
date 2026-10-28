# Urban Transport Manager1 — Node.js lab edition

A new Node.js REST API **starter**, not a verified one-to-one conversion of the original C++ repository. Uses only built-in Node.js modules (Node 20+).

## Run

```bash
npm start
```

Server listens at `http://127.0.0.1:3000`.

## Test

```bash
npm test
npm run check
```

## API

- `GET /health`
- `GET /api/vehicles`, `POST /api/vehicles` with `{ "plate": "TX-101", "capacity": 40 }`
- `GET /api/routes`, `POST /api/routes` with `{ "origin": "Dallas", "destination": "Plano", "fare": 5 }`
- `GET /api/bookings`, `POST /api/bookings` with `{ "passengerName": "Alex", "routeId": "<route id>" }`

Data is in memory and resets on restart. This is a learning project, not a production-ready booking system.

## Jenkins + SonarQube

The `Jenkinsfile` requires the Jenkins NodeJS plugin, SonarQube Scanner plugin and SonarQube server integration. Configure tool names `NodeJS`, `SonarQubeScanner`, and SonarQube server `SonarQube`, or edit the file to match your installation. Configure a SonarQube webhook at `http://<jenkins-host>:8080/sonarqube-webhook/` so the quality gate stage can complete. Configure a SonarQube token in Jenkins credentials, rather than embedding it in code. Run Jenkins from a repository location containing this Jenkinsfile; if placed in a subdirectory, configure the script path and working directory accordingly.
