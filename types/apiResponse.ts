export type RefreshResponse = {
  token: string;
  tokenExpires: number;
};

export type User = {
  id: number;
  email: string;
  provider: string;
  socialId: number | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo: {
    path: string;
  };
  role: {
    id: number;
    name: string;
    __entity: string;
  };
  status: {
    id: number;
    name: string;
    __entity: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type LoginSuccessResponse = {
  token: string;
  tokenExpires: number;
  user: User;
};

export type ErrorResponse = {
  statusCode: number;
  path: string;
  method: string;
  message: object | string; //Object.values(myObject)[0]
  error: string;
  success: string;
};
