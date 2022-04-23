# ln-detect
This is coding test for MYEO. In this repo, our program will detect which language or languages used by the user in input field.

# Info
This branch is responsible for **API** services.

### Available public api services
- /user/signup - **POST**
- /user/login - **POST**

### Available api services with middleware guard
The following routes are required to have **Auth-Token** in HTTP Header.
- /user/recordHistories - **GET**
- /user/recordHistory - **POST**
