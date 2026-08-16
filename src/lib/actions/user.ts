import {headers} from "next/headers";
import {getSession} from "../auth";

export const getUser = async () => {
    const session = await getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    return session.user;
};
