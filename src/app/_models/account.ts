import { Role } from './role';

export class Account {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	approved: string;
	behaviourRating: number;
	contentRatings: ContentRatings;
	jwtToken?: string;
	verified: string;
	createdAt: string;
	updatedAt: string;
	approvedSubjects: ApprovedSubjects;
	transcript: Transcript;
}

class ContentRatings {
	overallContentRating: number;
	mathContentRating: number;
	scienceContentRating: number;
	socialStudiesContentRating: number;
	languageArtsContentRating: number;
	foreignLanguageAcquisitionContentRating: number;
}

class ApprovedSubjects {
	math: boolean;
	science: boolean;
	socialStudies: boolean;
	languageArts: boolean;
	foreignLanguageAcquisition: boolean;
}

class Transcript {
	math: string;
	science: string;
	socialStudies: string;
	languageArts: string;
	foreignLanguageAcquisition: string;
}