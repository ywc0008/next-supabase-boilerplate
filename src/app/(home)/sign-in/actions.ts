"use server";

import type { ApiResultWithItem } from "@/types/api";
import type { AuthTokenResponsePassword, OAuthResponse, Provider } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";

type SignInWithPasswordResponse = ApiResultWithItem<AuthTokenResponsePassword["data"]>;

export async function signInWithPasswordAction(formData: FormData): Promise<SignInWithPasswordResponse> {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return {
			result: false,
			message: error.message,
		};
	}

	return {
		result: true,
		item: data,
	};
}

type SignInWithOauthResponse = ApiResultWithItem<OAuthResponse["data"]>;

export async function signInWithOauthAction(provider: Provider): Promise<SignInWithOauthResponse> {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: "http://localhost:3000/auth/callback",
			queryParams: {
				prompt: "select_account",
			},
		},
	});

	if (error) {
		return {
			result: false,
			message: error.message,
		};
	}

	return {
		result: true,
		item: data,
	};
}

export async function signOut() {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();

	if (error) throw error;

	return true;
}
