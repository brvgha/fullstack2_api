export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
  type: string;
};

export type Favourites = {
  name: string;
  id: string;
  user: User;
};

export type MustWatch = {
  name: string;
  id: string;
  user: User;
};

export type Db = {
  userStore: any;
  movieStore: any;
};