import { User } from '../types';

export type FileReadError = {
  message: string;
};

export type FileReadResponse<T, E = FileReadError> =
  | {
      status: 'ok';
      response: T;
    }
  | {
      status: 'fail';
      response: E | FileReadError;
    };

export type GetUsersCallback<T = User[], E = FileReadError> = (
  data: FileReadResponse<T, E>
) => any;
