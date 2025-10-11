import {AnonymousNavbar} from "@/components/navbar/Anonymous-navbar";
import {ReactNode} from "react";
import {AnonymousFooter} from "@/components/footer/Anonymous-footer";

export const AnonymousLayout = ({children} : {children : ReactNode}) => {
    return (
        <main className="w-screen h-screen overflow-y-auto flex flex-col px-5">
        <AnonymousNavbar />
        <main>{children}</main>
        <AnonymousFooter />
        </main>
    )
}