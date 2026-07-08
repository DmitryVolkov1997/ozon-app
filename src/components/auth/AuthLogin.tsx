import { signIn } from "@/lib/auth-client";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent, useState } from "react";
import { AuthForm } from "./AuthForm";

interface AuthLoginProps {
	isPending: boolean;
	authMode: "login" | "register";
	ref: RefObject<HTMLFormElement | null>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setAuthMode: Dispatch<SetStateAction<"login" | "register">>;
	isOpen: boolean;
}

export const AuthLogin = ({
	isPending,
	authMode,
	ref,
	setIsOpen,
	setAuthMode,
	isOpen,
}: AuthLoginProps) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleSignIn = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await signIn.email({ email, password });

		if (error?.message) {
			setError(error.message);
		}
	};

	return (
		<AuthForm
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			ref={ref}
			onConfirm={handleSignIn}
			setIsOpen={setIsOpen}
			error={error}
			isPending={isPending}
			title="Войти"
			authMode={authMode}
			setAuthMode={setAuthMode}
			isOpen={isOpen}
		/>
	);
};
