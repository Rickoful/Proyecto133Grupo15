import { useState } from 'react';

export default function LoginScreen({ onLogin, loading = false, error = '' }) {
	const [username, setUsername] = useState('admin');
	const [password, setPassword] = useState('123');

	const handleSubmit = async (event) => {
		event.preventDefault();
		await onLogin({ username, password });
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.98),_rgba(2,6,23,1))] text-slate-100 flex items-center justify-center px-4 py-10">
			<div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,148,136,0.12),transparent_35%,rgba(15,23,42,0.24)_70%,transparent)]" />

			<div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-950/90 shadow-[0_24px_70px_rgba(2,6,23,0.6)] backdrop-blur">
				<div className="border-b border-slate-800 bg-slate-900/80 px-8 py-6">
					<span className="inline-flex items-center rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-teal-200">
						Control de Equipos Prestados - Login
					</span>
					<h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50">
						Iniciar sesión
					</h1>
					<p className="mt-2 text-sm leading-6 text-slate-300">
						Inicia sesión para acceder a operaciones protegidas y administrar usuarios, equipos y préstamos desde tus endpoints Flask.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
					<label className="block space-y-2">
						<span className="text-sm font-medium text-slate-300">Usuario</span>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="input input-bordered w-full border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
							placeholder="admin"
							autoComplete="username"
							required
						/>
					</label>

					<label className="block space-y-2">
						<span className="text-sm font-medium text-slate-300">Contraseña</span>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="input input-bordered w-full border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
							placeholder="••••••••"
							autoComplete="current-password"
							required
						/>
					</label>

					{error && (
						<div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="btn w-full border-0 bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20 hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
					>
						{loading ? 'Ingresando...' : 'Entrar'}
					</button>

					<p className="text-center text-xs leading-5 text-slate-400">
						Usa las credenciales del sistema para continuar.
					</p>
				</form>
			</div>
		</div>
	);
}
