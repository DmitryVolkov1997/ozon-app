import {useOutsideClick} from "@/hooks/useOutsideClick";
import {useSession} from "@/lib/auth-client";
import {useEffect, useState} from "react";

export const useAuthModal = () => {
    const {isOpen, setIsOpen, ref} = useOutsideClick<HTMLFormElement>(false);
    const {data, isPending} = useSession();
    const [authMode, setAuthMode] = useState<"login" | "register">("login");

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    useEffect(() => {
        if (data?.user) {
            setIsOpen(false);
        }
    }, [data, setIsOpen]);


    return {
        isOpen, setIsOpen, ref,
        data, isPending,
        authMode, setAuthMode
    }
}