import Notification from "@/components/Notification";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface MyResponse {
  message: string
}

export default function Register() {
  const cookiesAuth = cookies().get("Authorization")

  if(cookiesAuth) {
      redirect("/")
  }

    const handleRegister = async (formData: FormData) => {
      "use server"
      
      // let error = false as boolean
      
      const name = formData.get("name")
      const username = formData.get("username")
      const email = formData.get("email")
      const password = formData.get("password")
  
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, username, email, password
        })
      })
  
      const result = (await response.json()) as MyResponse
      
      // error = !response.ok
      
      if(!response.ok) {
        return redirect("/register?error=" + result.message)
      }
  
      return redirect("/login")
    }


  
    return(
      
<div className="flex items-center justify-center min-h-screen">
  <div className="w-full sm:w-80">
    <Notification/>
    <h1 className="flex items-center justify-center font-bold mb-10 text-2xl">Register</h1>
    <form action={handleRegister}>
    <label className="input input-bordered flex items-center gap-4 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70">
        <path
          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
        <path
          d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
      </svg>
      <input type="text" name="email" className="grow" placeholder="Email" />
    </label>
    <label className="input input-bordered flex items-center gap-4 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70">
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
      <input type="text" name="name" className="grow" placeholder="Full Name" />
    </label>
    <label className="input input-bordered flex items-center gap-4 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70">
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
      <input type="text" name="username" className="grow" placeholder="Username" />
    </label>
    <label className="input input-bordered flex items-center gap-4 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70">
        <path
          fillRule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clipRule="evenodd" />
      </svg>
      <input type="password" name="password" className="grow" placeholder="Password" />
    </label>
    <button className="btn btn-block text-base">Submit</button>
    </form>
    <p className="flex items-center justify-center mt-2 text-sm">Already have an account?</p>
    <Link href={"/login"} className="flex items-center justify-center font-bold mt-2 text-sm underline hover:no-underline">Login</Link>
  </div>
</div>

    )
}