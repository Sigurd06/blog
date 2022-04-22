export interface ISingInData {
  email: string;
  password: string;
}

export interface ISingUpDate extends ISingInData {
  username: string;
}
