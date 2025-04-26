import { redirect } from "next/navigation"
import { auth } from "@/auth"

async function PaginaAdmin() {
  const sesion = await auth()

  if (sesion && sesion?.user?.role === 'ADMIN')
    return (
      <>
        <h1 className="text-3xl font-bold"> 🔐 </h1>
        <h1 className="text-3xl font-bold">Admin panel</h1>
        <p> {sesion?.user.name}</p>
        <p> {sesion?.user.email} </p>
        <p> {sesion?.user.role} </p>
        <img src={sesion?.user.image}></img>
      </>
    )
  else redirect('/dashboard')
}

export default PaginaAdmin