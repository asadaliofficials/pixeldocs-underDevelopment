export {};

declare global {
	interface CustomJwtSessionClaims {
		o?: {
			id: string;
			rol?: string;
			slg?: string;
			// Add other organization properties if needed
		};
	}
}
