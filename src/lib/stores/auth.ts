export interface UserContext {
	user: {
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
	firm: {
		id: number;
		name: string;
		tax_id: string;
		status: string;
	};
	password_expired: boolean;
}

import { writable } from "svelte/store";

function createAuthStore() {
	const { subscribe, set, update } = writable<UserContext | null>(null);

	return {
		subscribe,
		set,
		clear: () => set(null),
		hasRole: (roleName: string) => {
			let result = false;
			const unsubscribe = subscribe((ctx) => {
				result = ctx?.role?.name === roleName;
			});
			unsubscribe();
			return result;
		},
	};
}

export const authStore = createAuthStore();
