import db from '../data/db.json';

export const getUsers = () => {
  return db.users;
};

export const getTasks = () => {
  return db.tasks;
};