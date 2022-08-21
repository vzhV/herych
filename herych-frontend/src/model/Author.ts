import {Label} from "./Label";

export interface Author{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Label[];
}
