import { loginGoogle, loginGithub, loginDiscord } from "@/lib/actions";

function OauthForm({ className, error }) {
  return (
    <div className={`mt-10 ${className}`}>
      <form>
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Iniciar sesión OAuth
        </h1>

        <button
          formAction={loginGoogle}
          className="mb-4 w-full h-12 flex gap-4 items-center justify-center rounded-lg bg-black font-bold hover:bg-slate-300 text-white"
        >
          <img src="/images/google.svg" alt="Google" className="h-6 w-6" />
          Iniciar sesión con Google
        </button>

        <button
          formAction={loginGithub}
          className="mb-4 w-full h-12 flex gap-4 items-center justify-center rounded-lg  bg-black font-bold hover:bg-slate-300 text-white"
        >
          <img src="/images/github.svg" alt="Github" className="h-6 w-6" />
          Iniciar sesión con Github
        </button>

        <button
          formAction={loginDiscord}
          className="mb-4 w-full h-12 flex gap-4 items-center justify-center rounded-lg bg-black font-bold hover:bg-slate-300 text-white"
        >
          <img src="/images/discord.svg" alt="Discord" className="h-6 w-6" />
          Iniciar sesión con Discord
        </button>

        {error && (
          <p className="text-red-500 text-center font-medium mt-4">{error}</p>
        )}
      </form>
    </div>
  );
}

export default OauthForm;
