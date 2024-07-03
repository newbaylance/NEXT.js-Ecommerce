import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default function RequireLogin({ children }: {children: React.ReactNode}) {
    let cookiesAuth = cookies().get("Authorization")

    if(!cookiesAuth) {
        redirect("/login")
    }

    return <>{children}</>
}