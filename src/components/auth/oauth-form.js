import { loginGoogle, loginGithub, loginDiscord } from "@/lib/actions"

function OauthForm({ className, error }) {

  return (
    <form className={className}>
      <h1 className="text-3xl font-bold mb-4">Iniciar sesión OAuth</h1>

      <div className='flex flex-col gap-1'>
        <button formAction={loginGoogle}
          className="flex gap-6 items-center px-8 py-4 rounded-md bg-slate-200 font-bold hover:bg-white">
          <img src="/images/google.svg" alt="Google" />  Iniciar sesión con Google
        </button>

        <button formAction={loginGithub}
          className="flex gap-6 items-center px-8 py-4 rounded-md bg-slate-200 font-bold hover:bg-white">
          <img src="/images/github.svg" alt="Github" /> Iniciar sesión con Github
        </button>

        <button formAction={loginDiscord}
          className="flex gap-6 items-center px-8 py-4 rounded-md bg-slate-200 font-bold hover:bg-white">
          <img src="/images/discord.svg" alt="Discord" /> Iniciar sesión con Discord
        </button>
        {error}
      </div>
    </form>
  )
}

export default OauthForm
