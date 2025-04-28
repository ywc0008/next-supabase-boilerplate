import { getUser } from "@/utils/supabase/server";

import { AuroraText } from "@/components/magicui/aurora-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppWindowMacIcon, ArrowRight, Rocket, RocketIcon, Zap, ZapIcon } from "lucide-react";

import { GithubIcon } from "@/components/common/social-icons";
import { Marquee } from "@/components/magicui/marquee";

const features = [
	{
		icon: RocketIcon,
		title: "Rapid Development",
		description: "Accelerate development with Next.js and Supabase",
		content:
			"Boost your productivity with Next.js 15 features including server components, API routes, and server actions.",
	},
	{
		icon: ZapIcon,
		title: "Authentication & Authorization",
		description: "Easy authentication with Supabase Auth",
		content:
			"Complete authentication system with email/password, OAuth social logins, session management, and security.",
	},
	{
		icon: GithubIcon,
		title: "Open Source",
		description: "Extensible open source project",
		content: "An open source boilerplate that anyone can freely use and extend.",
	},
	{
		icon: AppWindowMacIcon,
		title: "API Interface",
		description: "Clean and consistent API architecture",
		content:
			"Well-structured API interfaces with TypeScript types, providing a consistent approach to data fetching, error handling, and state management across your application.",
	},
];

export default async function Home() {
	const user = await getUser();

	return (
		<div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			{/* Header Section */}
			<div className="w-full max-w-7xl text-center space-y-4 mt-8">
				<div className="h-4">
					<TypingAnimation className="text-lg text-muted-foreground">
						{user ? `Hello, ${user.user_metadata.name}!` : "Easily build web applications with Next.js and Supabase"}
					</TypingAnimation>
				</div>
				<h1 className="text-5xl font-bold tracking-tight sm:text-6xl mt-6">
					<AuroraText className="text-6xl sm:text-7xl font-extrabold">Next.js + Supabase</AuroraText>
				</h1>
				<p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
					Quickly prototype and deploy with modern web development stack. A boilerplate with integrated authentication
					system and database.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					{!user ? (
						<Link href="/sign-in">
							<Button size="lg" className="gap-2">
								Get Started <ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					) : (
						<Link href="/dashboard">
							<Button size="lg" className="gap-2">
								Go to Dashboard <ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					)}
					<Link href="https://github.com/ywc0008/next-supabase-boilerplate" target="_blank">
						<Button variant="outline" size="lg" className="gap-2">
							<GithubIcon className="h-4 w-4" /> GitHub
						</Button>
					</Link>
				</div>
			</div>

			{/* Features Section */}
			<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
				<h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
				<Marquee pauseOnHover className="[--duration:20s]">
					{features.map((feature) => (
						<FeatureCard key={feature.title} {...feature} />
					))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
			</div>
		</div>
	);
}

function FeatureCard({
	icon: Icon,
	title,
	description,
	content,
}: { icon: React.ElementType; title: string; description: string; content: string }) {
	return (
		<Card className="w-[400px] h-[280px] mx-4 flex flex-col">
			<CardHeader>
				<Icon className="h-10 w-10 text-primary mb-2" />
				<CardTitle className="text-lg">{title}</CardTitle>
				<CardDescription className="text-sm line-clamp-2">{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-sm break-words overflow-hidden overflow-ellipsis line-clamp-5">{content}</p>
			</CardContent>
		</Card>
	);
}
