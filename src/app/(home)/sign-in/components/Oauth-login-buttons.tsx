"use client";

import type { Provider } from "@supabase/supabase-js";

import { useState } from "react";

import OauthLoginButton from "./Oauth-login-button";

export default function OauthLoginButtons() {
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [activeProvider, setActiveProvider] = useState<Provider | null>(null);

	const handleLoginStart = (provider: Provider) => {
		setIsLoggingIn(true);
		setActiveProvider(provider);
	};

	return (
		<>
			<OauthLoginButton provider="google" isDisabled={isLoggingIn} onLoginStart={() => handleLoginStart("google")} />
			<OauthLoginButton provider="apple" isDisabled={isLoggingIn} onLoginStart={() => handleLoginStart("apple")} />
			<OauthLoginButton provider="kakao" isDisabled={isLoggingIn} onLoginStart={() => handleLoginStart("kakao")} />
			<OauthLoginButton provider="github" isDisabled={isLoggingIn} onLoginStart={() => handleLoginStart("github")} />

			{isLoggingIn && <p className="text-sm text-center mt-2">{activeProvider} signing in...</p>}
		</>
	);
}
