
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface MyResponse<T> {
  data: T
  message: string
}

export default function Login() {
  const cookiesAuth = cookies().get("Authorization")

        if(cookiesAuth) {
            redirect("/")
        }

  const handleLogin = async (formData: FormData) => {
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const result = (await response.json()) as MyResponse<{
      access_token: string
    }>

    if(!response.ok) {
      return redirect("/login?error=" + result.message)
    }

    if(result.data) {
      cookies().set("Authorization", `Bearer ${result.data.access_token}`)
    }

    return redirect("/")
  }


    return(
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full sm:w-80">
        <h1 className="flex items-center justify-center font-bold mb-10 text-2xl">Login</h1>
        <form action={handleLogin}>
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
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" name="password" className="grow" placeholder="Password" />
        </label>
        <button className="btn btn-block text-base">Submit</button>
        </form>
        <p className="flex items-center justify-center mt-2 text-sm">Do not have any account?</p>
        <Link href={"/register"} className="flex items-center justify-center font-bold mt-2 text-sm underline hover:no-underline">Register</Link>
      </div>
    </div>

    )
}