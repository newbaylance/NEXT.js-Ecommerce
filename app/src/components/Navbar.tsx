import { deleteCookies } from "@/action";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Navbar() {
  "use server"
  const cookiesAuth = cookies().get("Authorization")

  // async function deleteCookies() {
  //   cookies().delete("Authorization")
  //   redirect("/login")
  // }

    return(
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link href={"/products"}>Products</Link></li>
        <li><Link href={"/wishlist"}>Wishlist</Link></li>
      </ul>
    </div>
    <Link href={"/"} className="btn btn-ghost text-xl">Adimas Sport</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={"/products"}>Products</Link></li>
      <li><Link href={"/wishlist"}>Wishlist</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <form action={deleteCookies}>
      <button className="btn" type="submit">{(cookiesAuth) ? "Logout" : "Login"}</button>
    </form>
  </div>
</div>
    )
}