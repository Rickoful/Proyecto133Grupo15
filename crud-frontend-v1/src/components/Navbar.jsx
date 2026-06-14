const tabs = [
    { key: 'usuarios', label: 'Usuarios' },
    { key: 'equipos', label: 'Equipos' },
    { key: 'prestamos', label: 'Prestamos' },
    { key: 'historial', label: 'Historial' },
    { key: 'reportes', label: 'Reportes' },
];

export default function Navbar({ entity, entityLabel, onEntityChange, onOpen, search, onSearch, onLogout }) {
    return (
        <>
           <div className="navbar bg-base-100 rounded-box border border-base-300 px-3">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Control de Equipos Prestados</a>
            </div>
            <div className="navbar-center">
                <div className="join hidden md:flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`btn join-item ${entity === tab.key ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => onEntityChange(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="navbar-end gap-2">
                <div className="form-control hidden lg:block">
                    <input
                        type="text"
                        placeholder={`Buscar en ${entityLabel}`}
                        className="input input-bordered w-56"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                {onLogout && (
                    <button onClick={onLogout} className="btn btn-error">
                        Cerrar sesión
                    </button>
                )}
                {onOpen && (
                    <button onClick={onOpen} className="btn btn-primary">Agregar</button>
                )}
            </div>
            </div>

            <div className="join mt-3 w-full md:hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`btn join-item flex-1 ${entity === tab.key ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => onEntityChange(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="form-control mt-3 lg:hidden">
                <input
                    type="text"
                    placeholder={`Buscar en ${entityLabel}`}
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
</>
    )
}