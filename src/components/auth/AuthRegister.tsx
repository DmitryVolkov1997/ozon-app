import { signUp } from "@/lib/auth-client";
import { RefObject, Dispatch, SetStateAction, useState, SyntheticEvent } from "react";
import { AuthForm } from "./AuthForm";

interface AuthRegisterProps {
	isPending: boolean;
	authMode: "login" | "register";
	ref: RefObject<HTMLFormElement | null>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setAuthMode: Dispatch<SetStateAction<"login" | "register">>;
	isOpen: boolean;
}

export const AuthRegister = ({
	isPending,
	authMode,
	ref,
	setIsOpen,
	setAuthMode,
	isOpen,
}: AuthRegisterProps) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState<string>("");

	const handleSignUp = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error } = await signUp.email({ email, password, name });

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
			onConfirm={handleSignUp}
			setIsOpen={setIsOpen}
			error={error}
			isPending={isPending}
			title="Регистрация"
			authMode={authMode}
			name={name}
			setName={setName}
			setAuthMode={setAuthMode}
			isOpen={isOpen}
		/>
	);
};
