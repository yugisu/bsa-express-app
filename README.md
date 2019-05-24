# BSA19-EXPRESS
Solution of third task of home assignment from BSA.

`👾` Built entirely in `Typescript` `👾`

`🚧` Development server based on `tsc` compiler and `nodemon` to refresh server on file changes `🚧`

## Install
- Clone this repo by `git clone https://bitbucket.org/yugisu/bsa19-express.git`.
- Go into the created folder `cd bsa19-express`.
- Run `npm install` to install dependencies.
- Run `npm start` to start development server.
- Run `npm run build` to transpile files to `build/` folder.

## Usage
This is an API server, so the endpoints are:

- GET `users/` to receive the list of all users from file;
- GET `users/:id` to receive info about one user with specified `id`;
- POST `users/` to add new user (adds new user to the `storage/users.json` file);
- PUT `users/:id` to modify user with `id`;
- DELETE `users/:id` to delete user with `id`;

## Credits
(c) yugisu 