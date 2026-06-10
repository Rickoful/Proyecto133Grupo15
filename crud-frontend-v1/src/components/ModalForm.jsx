export default function ModalForm({
    isOpen,
    onClose,
    mode,
    onSubmit,
    entityLabel,
    fields,
    values,
    onChange,
}) {
    if (!isOpen) {
        return null;
    }

    const title = mode === 'edit' ? `Editar ${entityLabel.slice(0, -1)}` : `Nuevo ${entityLabel.slice(0, -1)}`;

    return (
        <>  
            <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg py-4">{title}</h3>
                
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        {fields.map((field) => (
                            <div key={field.key}>
                                <label className="label py-1">
                                    <span className="label-text">{field.label}</span>
                                </label>

                                {field.type === 'select' ? (
                                    <select
                                        className="select select-bordered w-full"
                                        value={values[field.key] ?? ''}
                                        onChange={(e) => onChange(field.key, e.target.value)}
                                        required={field.required}
                                    >
                                        {(field.options || []).map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type || 'text'}
                                        className="input input-bordered w-full"
                                        value={values[field.key] ?? ''}
                                        onChange={(e) => onChange(field.key, e.target.value)}
                                        required={field.required}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="btn btn-success">
                        {mode === 'edit' ? 'Guardar Cambios' : 'Crear Registro'}
                    </button>
                </form>
                
            </div>
            </dialog>

        </>
        
    );
}
