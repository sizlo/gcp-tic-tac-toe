gcp-tic-tac-toe
===============

## Prepare environment
### Backend
- Ensure `mvn` is installed
### Frontend
- Ensure `nvm` is installed
- `cd <project_root>/frontend`
- Use `nvm use` to switch to the required node version (defined in `./nvmrc`). You may be required to install this node version with `nvm install`
- `npm install`

## Run locally
### Backend
- `mvn spring-boot:run`
- http://localhost:8080
### Frontend
- `cd <project_root>/frontend`
- `npm start` 
- http://localhost:3000

## Run tests
### Backend
- `mvn test`
### Frontend
- `cd <project_root>/frontend`
- `npm test`

## Deploy to Google Cloud App Engine
- Ensure `gcloud` is installed along with the java extensions
- `mvn appengine:deploy`
