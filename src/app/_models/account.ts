import { Role } from './role';

export class Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  approved: string;
  behaviourRating: number;
  contentRatings: Array<any>;
  jwtToken?: string;
}
