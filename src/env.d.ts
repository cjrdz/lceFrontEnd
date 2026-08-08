/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		user?: {
			id: number;
			full_name: string;
			email: string;
			status: string;
			created_at: string;
		};
		role: {
			id: number;
			name: string;
		} | null;
		firm?: {
			id: number;
			name: string;
			tax_id: string;
			status: string;
		};
		password_expired?: boolean;
	}
}
