import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { getUserById, getUsers } from "@/lib/data";
import UserList from "@/components/users/lista";

export default async function UsersPage() {
  const session = await auth();



  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  
  const users = await getUsers();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <BackButton />
        <Link
          href="/"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Inicio</span>
        </Link>
      </div>

      <UserList users={users} session={session} />
    </div>
  );
}
