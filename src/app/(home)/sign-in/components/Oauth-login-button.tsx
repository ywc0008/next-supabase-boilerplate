"use client";

import type { Provider } from "@supabase/supabase-js";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { GoogleIcon, AppleIcon, KakaoIcon, NaverIcon, GithubIcon } from "@/components/common/social-icons";

import { signInWithOauthAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OauthLoginButtonProps {
	provider: Provider;
	isDisabled?: boolean;
	onLoginStart?: () => void;
}

export default function OauthLoginButton({ provider, isDisabled = false, onLoginStart }: OauthLoginButtonProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (onLoginStart) {
			onLoginStart();
		}

		startTransition(async () => {
			const { result, item, message } = await signInWithOauthAction(provider);

			if (!result) {
				toast.error(message);
			} else {
				if (item.url) {
					window.location.href = item.url;
				} else {
					toast.error("인증 URL이 제공되지 않았습니다.");
				}
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button
				type="submit"
				disabled={isPending || isDisabled}
				className="w-full text-sm h-12 bg-white text-dark border cursor-pointer hover:bg-black/5"
			>
				{isPending ? (
					<div className="size-6 border-2 border-dark border-t-transparent rounded-full animate-spin" />
				) : (
					<>
						{provider === "google" && <GoogleIcon className="size-8" />}
						{provider === "apple" && <AppleIcon className="size-8" />}
						{provider === "kakao" && <KakaoIcon className="size-7" />}
						{provider === "github" && <GithubIcon className="size-6" />}
					</>
				)}
				<span className="ml-2">{isPending ? "Signing in..." : `Continue with ${provider}`}</span>
			</Button>
		</form>
	);
}
