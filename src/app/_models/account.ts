import { Role } from './role';

export class Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  behaviourRating: number;
  overallContentRating: number;
  mathContentRating: number;
  scienceContentRating: number;
  socialStudiesContentRating: number;
  languageArtsContentRating: number;
  ForeignLanguageAcquisitionContentRating: number;
  jwtToken?: string;
}
