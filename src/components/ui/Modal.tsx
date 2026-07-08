import { X } from "lucide-react";
import { KeyboardEvent, ReactNode, RefObject, SyntheticEvent } from "react";

interface ModalProps {
	children?: ReactNode;
	onClose?: () => void;
	ref: RefObject<HTMLFormElement | null>;
	onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const Modal = ({ children, onClose, ref, onSubmit }: ModalProps) => {
	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center flex-col  bg-black/10 fadeIn">
			<form
				className="bg-white rounded-xl shadow-xl relative p-5 max-w-96 w-full"
				ref={ref}
				onSubmit={onSubmit}
			>
				<button
					className="bg-zinc-200 size-6 rounded-full absolute top-3 right-3 flex justify-center items-center"
					onClick={onClose}
					type="button"
				>
					<X className="text-zinc-600" size={20} />
				</button>

				{children}
			</form>
		</div>
	);
};
