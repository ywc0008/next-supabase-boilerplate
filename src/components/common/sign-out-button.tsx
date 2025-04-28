"use client";

import { useTransition } from "react";

import { signOutAction } from "@/app/(home)/sign-in/actions";

import { Button } from "../ui/button";

export default function SignOutButton() {
	const [isPending, startTransition] = useTransition();

	const handleSignOut = () => {
		startTransition(async () => {
			await signOutAction();
		});
	};

	return (
		<Button disabled={isPending} variant="outline" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
