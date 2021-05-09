import { Subject } from './subject';

export class Slate {
  id: string;
  account: string;
  createdAt: string;
  updatedAt: string;
  subject: Subject;
  details: string;
  startDateTime: string;
  endDateTime: string;
  registered: string;
  registerDate: string;
  markedCompletedStudent: boolean;
  markedCompletedTutor: boolean;
  tutorContentRatingByStudent: number;
  tutorBehaviourRatingByStudent: number;
  studentBehaviourRatingByTutor: number;
  deleted: Boolean;
  deleteDate: string;
}
