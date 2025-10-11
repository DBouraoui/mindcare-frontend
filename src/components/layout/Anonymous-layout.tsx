import {AnonymousNavbar} from "@/components/navbar/Anonymous-navbar";
import {ReactNode} from "react";
import {AnonymousFooter} from "@/components/footer/Anonymous-footer";

export const AnonymousLayout = ({children} : {children : ReactNode}) => {
    return (
        <>
        <AnonymousNavbar />
        <main>{children}</main>
        <AnonymousFooter />
        </>
    )
}