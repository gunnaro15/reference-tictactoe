1. http://82.221.49.131:8080/ - User id: kennarar - Password: 123

2. http://52.209.153.136/



## Scripts

- build_script.sh: Build the app, run unit tests, build Docker image and push it to Dockerhub.

- build.sh: The npm build commands, to build the app.

- Dockerfile: Information for docker build. 

- docker-compose.yml: Information for docker-compose up.

- run_fix.sh: Wait for database to get started, migrate it and then run the app.

- jenkins/run_app.sh: Run the app on the production server.

- jenkins/run_test.sh: Run the app in the test server.

- provisioning/provision.sh: Provision a new test server.



## Testing & logic

- Unit tests

- API Acceptance test

- Load test loop: I was not able to make the API test work in a loop so I made a very simple load test, similar to the chat load test. It just creates 100 games.



## Data migration

- I made a migration up to add a missing column.



## Jenkins

- Commit Stage(Build): Runs build_script.sh.

- Acceptance Stage(API tests): Provisions a new server and runs the API tests.

- Capacity Stage(Load tests): Uses the same server as the Acceptance Stage to run load tests and then terminates the server.

- Production(Deploy): Deploys the app to the production server.



Jenkins features

- Schedule and commit hooks: After each git push the pipeline starts: Build -> API tests -> Load tests -> Deploy.

- Test reports: The first three jobs publish reports for unit tests, API tests and then load tests.



## Other

- Like mentioned above I provision a new server for each build to run the API and load tests on and then terminate it.
