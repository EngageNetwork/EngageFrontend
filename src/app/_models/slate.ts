import { Subject } from './subject';

export class Slate {
  id: string;
  account: string;
  created: string;
  updated: string;
  subject: Subject;
  startDateTime: string;
  endDateTime: string;
  registered: string;
  markedCompletedStudent: boolean;
  markedCompletedTutor: boolean;
  tutorName: string;
  studentName: string;
}
