// Data model for the first-responder handoff card.
//
// This intentionally excludes fields that would identify the person being
// referred (legal name, DOB, SSN, HMIS ID, etc.) — see "Application Rules"
// in CLAUDE.md. `preferredName` is how the person wants to be addressed,
// not a legal identifier. There is no risk/vulnerability score field by
// design; `timing` reflects logistics of the need, not a judgment about
// the person.

export type ServiceCategory =
	| 'shelter'
	| 'food'
	| 'medical'
	| 'crisis'
	| 'substance'
	| 'weather'
	| 'id'
	| 'case';

export type HandoffTiming = 'tonight' | 'this-week' | 'flexible';

export interface HandoffCard {
	responderName: string;
	responderAgency: string;
	responderContact: string;
	encounterLocation: string;
	encounterDateTime: string;
	preferredName: string;
	categories: ServiceCategory[];
	timing: HandoffTiming;
	notes: string;
	consentConfirmed: boolean;
	humanConfirmed: boolean;
}

export function createEmptyHandoffCard(): HandoffCard {
	return {
		responderName: '',
		responderAgency: '',
		responderContact: '',
		encounterLocation: '',
		encounterDateTime: '',
		preferredName: '',
		categories: [],
		timing: 'flexible',
		notes: '',
		consentConfirmed: false,
		humanConfirmed: false
	};
}
