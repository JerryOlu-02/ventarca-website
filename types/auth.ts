export type User = {
  id: string;
  email: string;
  firtName: string;
  role: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // phoneNumber: string;
  // termsAgreement: boolean;
  // notifsAggrement: boolean;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RefreshResopnse = {};

export type RegisterResopnse = {};

export type Loginesopnse = {};
