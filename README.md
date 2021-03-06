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
### Backend + Frontend
- Ensure `gcloud` is installed along with the java extensions
- `mvn appengine:deploy`
### notifier cloud function
- `cd <project_root>/notifier`
- `gcloud functions deploy notifier --entry-point handle_message --runtime python38 --trigger-topic moves --region europe-west2`
### completed-game-deleter cloud function
- `cd <project_root/completed-game-deleter`
- `gcloud functions deploy completed-game-deleter --entry-point handle_message --runtime python38 --trigger-topic delete-completed-games --region europe-west2`
