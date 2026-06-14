const formatDate = (value) => {
    if (!value) {
        return '-';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString();
};

export default function TableList({ entity, columns, rows, idKey, onEdit, onDelete, onReturnLoan }) {
    const showActions = Boolean(onEdit || onDelete || onReturnLoan);

    return (
        <div className="overflow-x-auto mt-10 rounded-box border border-slate-800/70 bg-slate-950/95 ">
                <table className="table table-zebra text-slate-100">
                    <thead className="bg-slate-800 text-slate-100">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}
                        {showActions && <th className="text-right">Acciones</th>}
                    </tr>
                </thead>

                <tbody>
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center text-slate-300 py-8">
                                No hay registros para mostrar.
                            </td>
                        </tr>
                    )}

                    {rows.map((item) => (
                        <tr key={item[idKey]} className="hover:bg-slate-950/95">
                            {columns.map((column) => {
                                const rawValue = column.render ? column.render(item) : item[column.key];
                                const displayValue = column.type === 'date' ? formatDate(rawValue) : (rawValue ?? '-');
                                const isStatus = column.key === 'estado';
                                const normalized = String(displayValue).toLowerCase();

                                return (
                                    <td key={`${item[idKey]}-${column.key}`}>
                                        {isStatus ? (
                                            <span className={`badge ${normalized === 'activo' || normalized === 'disponible' ? 'badge-success' : 'badge-warning'} badge-outline`}>
                                                {displayValue}
                                            </span>
                                        ) : (
                                            displayValue
                                        )}
                                    </td>
                                );
                            })}

                            {showActions && (
                                <td>
                                    <div className="flex justify-end gap-2">
                                        {entity === 'prestamos' && onReturnLoan && item.estado === 'activo' && (
                                            <button className="btn btn-sm btn-info" onClick={() => onReturnLoan(item)}>
                                                Devolver
                                            </button>
                                        )}

                                        {onEdit && (
                                            <button className="btn btn-sm btn-secondary" onClick={() => onEdit(item)}>
                                                Editar
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button className="btn btn-sm btn-accent" onClick={() => onDelete(item)}>
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}