import { auth } from "@/auth"


async function page() {
    // Obtener la sesión del usuario
    const sesion = await auth();


    console.log("Género desde la sesión:", sesion?.user.gender);
    const gender = sesion?.user.gender;

    const userImage = gender === 'male' 
        ? "https://res.cloudinary.com/arr17/image/upload/v1741329782/2810758_tymy2p.png"
        : gender === 'female'
        ? "https://res.cloudinary.com/arr17/image/upload/v1741329782/6075889_ucqs0u.png"
        : "https://res.cloudinary.com/arr17/image/upload/v1741363264/1200px-User_icon_2.svg_dyrkao.png"; // Imagen por defecto si no tiene género definido

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-100 mt-12">
            <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6"> 🔑 Dashboard</h1>
            
            <div className="flex flex-col items-center mb-6">
                <img 
                    src={userImage} 
                    alt="User Avatar" 
                    className="rounded-full h-32 w-32 mb-4 border-4 border-indigo-600 shadow-md"
                />
                <h2 className="text-2xl font-semibold text-gray-800">{sesion?.user.name}</h2>
                <p className="text-lg text-gray-600 mb-2">{sesion?.user.email}</p>
                <p className="text-lg text-indigo-600 italic">{sesion?.user.role}</p>
              
                <p className="text-lg text-gray-600">📌 {sesion?.user.pedido}</p>
            </div>
        </div>
    );
}

export default page;
