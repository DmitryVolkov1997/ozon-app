"use client";
import { signIn, signUp, useSession } from "@/lib/auth-client";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { SkeletonLoader } from "@/components/ui/SceletonLoader";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface AuthProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	ref: RefObject<HTMLFormElement | null>;
}

export const Auth = ({ ref, setIsOpen }: AuthProps) => {
	const { data: session, isPending } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSignUp = async () => {
		console.log({
			email,
			password,
			name,
		});

		const { error } = await signUp.email({ email, password, name });

		if (error?.message) {
			setError(error.message);
		}
	};

	const handleSignIn = async () => {
		const { error } = await signIn.email({ email, password });

		if (error?.message) {
			setError(error.message);
		}
	};

	return (
		<Modal ref={ref} onClose={() => setIsOpen(false)}>
			{isPending ? (
				<SkeletonLoader className="rounded-xl w-full mb-4" count={3} />
			) : (
				<>
					<h1 className="text-2xl font-semibold text-center mb-4">Вход/Регистрация</h1>

					{error && <div className="font-medium text-red-700 mb-4 italic">{error}</div>}

					<InputField
						value={email}
						type="email"
						placeholder="Введите email: "
						onChange={(e) => setEmail(e.target.value)}
					/>

					<InputField
						value={password}
						type="password"
						placeholder="Введите пароль: "
						onChange={(e) => setPassword(e.target.value)}
					/>

					<InputField
						value={name}
						type="text"
						placeholder="Введите имя: "
						onChange={(e) => setName(e.target.value)}
					/>

					<div className="flex items-center gap-x-4">
						<Button isDisabled={isPending} onClick={handleSignIn} type="button">
							{isPending ? "Загрузка..." : "Войти"}
						</Button>

						<Button isDisabled={isPending} onClick={handleSignUp} variant="secondary" type="button">
							{isPending ? "Загрузка..." : "Регистрация"}
						</Button>
					</div>
				</>
			)}
		</Modal>
	);
};
