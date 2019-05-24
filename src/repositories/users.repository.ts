import { readFile, writeFile } from 'fs';
import { User, UserNoId } from '../types';
import { GetUsersCallback, FileReadResponse } from './types';

/**
 * Users cache
 */
let cachedUsers: User[];

/**
 * Gets all users from users.json file
 */

export const getUsers = (callback: GetUsersCallback) => {
  if (cachedUsers !== undefined)
    return callback({
      response: cachedUsers,
      status: 'ok',
    });

  readFile('./storage/users.json', (err, data) => {
    if (err) {
      const errorMsg: FileReadResponse<User[]> = {
        status: 'fail',
        response: {
          message: 'Failed to get userdata',
        },
      };
      console.error(errorMsg.response.message);

      callback(errorMsg);
    } else {
      const users: { users: User[] } = JSON.parse(data.toString());

      cachedUsers = users.users;

      callback({ status: 'ok', response: users.users });
    }
  });
};

/**
 * Gets user by ID provided from users.json file
 */

export const getUserById = (id: number, callback: GetUsersCallback<User>) => {
  if (cachedUsers !== undefined) getAndSendUser(cachedUsers);
  else {
    getUsers((data) => {
      if (data.status === 'fail') return callback(data);

      getAndSendUser(data.response);
    });
  }

  function getAndSendUser(users: User[]) {
    const user = users.find((user) => user.id === id);

    callback(
      user === undefined
        ? {
            status: 'fail',
            response: {
              message: `No user with id "${id}"`,
            },
          }
        : {
            status: 'ok',
            response: user,
          }
    );
  }
};

/**
 * Adds new user and sends a response that contains created user
 * or an error message
 */

export const addUser = (
  newUser: UserNoId,
  callback?: GetUsersCallback<User>
) => {
  getUsers((data) => {
    if (data.status === 'ok') {
      const userIds = data.response.map(({ id }) => +id);

      // Generating new unique user id
      const newId = Math.max(...userIds) + 1;

      // Default user object
      const defaultUser: User = {
        id: newId,
        name: 'un Combattant',
        health: 50,
        attack: 3,
        defense: 1,
        source:
          'https://media1.tenor.com/images/0faba4edb10f7c0983d5720e8cb7f90d/tenor.gif?itemid=11572951',
      };

      // If not full user object provided, fill it with default properties
      const user = { ...defaultUser, ...newUser };
      const userJSON = JSON.stringify({
        users: [...cachedUsers, user],
      });

      // Writing to file
      writeFile('./storage/users.json', userJSON, (err) => {
        if (err) {
          const errorMsg: FileReadResponse<User[]> = {
            status: 'fail',
            response: {
              message: 'Failed to add new user',
            },
          };
          console.error('Could not add new user to file. Reason:', err);
          callback && callback(errorMsg);
        }

        // Add new user to cachedUsers
        cachedUsers.push(user);

        // Send new user to client via callback (if provided)
        callback && callback({ status: 'ok', response: user });
      });
    }
  });
};

export const editUser = (
  id: number,
  newUser: UserNoId | User,
  callback: GetUsersCallback<User>
) => {
  console.log(`Editing user with id ${id}, with changes: ${newUser}`);

  const defaultUser: User = {
    id: id,
    name: 'un Combattant',
    health: 50,
    attack: 3,
    defense: 1,
    source:
      'https://media1.tenor.com/images/0faba4edb10f7c0983d5720e8cb7f90d/tenor.gif?itemid=11572951',
  };

  callback({
    status: 'ok',
    response: { ...defaultUser, ...newUser },
  });
};

export const deleteUser = (
  id: number,
  callback: GetUsersCallback<{ message: string }>
) => {
  console.log(`Deleting user with id ${id}`);

  callback({
    status: 'ok',
    response: {
      message: 'deleted!',
    },
  });
};
