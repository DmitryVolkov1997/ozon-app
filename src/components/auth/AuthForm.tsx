import { Dispatch, RefObject, SetStateAction } from "react";
import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";
import { Modal } from "../ui/Modal";
import { SkeletonLoader } from "../ui/SceletonLoader";

interface AuthFormProps {
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	ref: RefObject<HTMLFormElement | null>;
	onConfirm: () => void;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	error: string | null;
	isPending: boolean;
	title: string;
	authMode: "login" | "register";
	name?: string;
	setName?: Dispatch<SetStateAction<string>>;
	setAuthMode: Dispatch<SetStateAction<"login" | "register">>;
}

export const AuthForm = ({
	email,
	setEmail,
	password,
	setPassword,
	ref,
	onConfirm,
	setIsOpen,
	error,
	isPending,
	title,
	authMode,
	name,
	setName,
	setAuthMode,
}: AuthFormProps) => {
	return (
		<Modal ref={ref} onClose={() => setIsOpen(false)}>
			{isPending ? (
				<SkeletonLoader className="rounded-xl w-full mb-4" count={3} />
			) : (
				<>
					<h1 className="text-2xl font-semibold text-center mb-4">{title}</h1>

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

					{authMode === "register" && (
						<>
							<InputField
								value={name || ""}
								type="text"
								placeholder="Введите имя: "
								onChange={(e) => setName?.(e.target.value)}
							/>

							<Button
								className="w-full py-1.5 mb-3"
								isDisabled={isPending}
								onClick={onConfirm}
								type="button"
							>
								{isPending ? "Загрузка..." : "Зарегестрироваться"}
							</Button>

							<div className="text-xl font-medium flex justify-center gap-x-1">
								<span>Уже есть аккаунт?</span>
								<button
									className="text-green-600 hover:text-green-500 hover:transition-colors"
									type="button"
									onClick={() => setAuthMode("login")}
								>
									Войти
								</button>
							</div>
						</>
					)}

					{authMode === "login" && (
						<>
							<Button
								className="w-full py-1.5 mb-3"
								isDisabled={isPending}
								onClick={onConfirm}
								type="button"
							>
								{isPending ? "Загрузка..." : "Войти"}
							</Button>

							<div className="text-xl font-medium flex justify-center gap-x-1">
								<span>Нет аккаунта?</span>
								<button
									className="text-green-600 hover:text-green-500 hover:transition-colors"
									type="button"
									onClick={() => setAuthMode("register")}
								>
									Регистрация
								</button>
							</div>
						</>
					)}
				</>
			)}
		</Modal>
	);
};
