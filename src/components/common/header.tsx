import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getUser } from "@/utils/supabase/server";

import { AuroraText } from "../magicui/aurora-text";
import SignOutButton from "./sign-out-button";

export default async function Header() {
	const user = await getUser();

	return (
		<header className="sticky top-0 z-50 w-full flex items-center justify-center py-4 px-6 md:px-12 border-b bg-white">
			<div className="container flex items-center justify-between">
				{/* Logo */}
				<div className=" z-10">
					<Link href="/" className="flex items-center gap-2">
						<AuroraText className="text-xl md:text-3xl font-bold text-green-500">Next.js+Supabase</AuroraText>
					</Link>
				</div>

				{/* User */}
				<div className="flex items-center gap-2 z-10">
					{user ? (
						<SignOutButton />
					) : (
						<Button asChild variant="outline">
							<Link href="/sign-in">Sign In</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
