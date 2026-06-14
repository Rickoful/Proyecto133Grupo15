import './App.css'
import { useEffect, useMemo, useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm';
import {
  clearAuthToken,
  createItem,
  deleteItem,
  fetchItems,
  loginUser,
  returnLoan,
  setAuthToken,
  updateItem,
} from './services/api';

const ENTITY_CONFIG = {
  usuarios: {
    label: 'Usuarios',
    endpoint: '/usuarios',
    idKey: 'id_usuario',
    columns: [
      { key: 'id_usuario', label: 'ID' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'apellido', label: 'Apellido' },
      { key: 'ci', label: 'CI' },
      { key: 'tipo_usuario', label: 'Tipo' },
      { key: 'telefono', label: 'Telefono' },
      { key: 'correo', label: 'Correo' },
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true },
      { key: 'apellido', label: 'Apellido', type: 'text', required: true },
      { key: 'ci', label: 'CI', type: 'text', required: true },
      { key: 'tipo_usuario', label: 'Tipo Usuario', type: 'text', required: true },
      { key: 'telefono', label: 'Telefono', type: 'text', required: false },
      { key: 'correo', label: 'Correo', type: 'email', required: false },
    ],
  },
  equipos: {
    label: 'Equipos',
    endpoint: '/equipos',
    idKey: 'id_equipo',
    columns: [
      { key: 'id_equipo', label: 'ID' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'descripcion', label: 'Descripcion' },
      { key: 'marca', label: 'Marca' },
      { key: 'modelo', label: 'Modelo' },
      { key: 'codigo_inventario', label: 'Codigo' },
      { key: 'estado', label: 'Estado' },
    ],
    formFields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true },
      { key: 'descripcion', label: 'Descripcion', type: 'text', required: false },
      { key: 'marca', label: 'Marca', type: 'text', required: true },
      { key: 'modelo', label: 'Modelo', type: 'text', required: true },
      { key: 'codigo_inventario', label: 'Codigo Inventario', type: 'text', required: true },
      {
        key: 'estado',
        label: 'Estado',
        type: 'select',
        required: true,
        options: ['disponible', 'prestado', 'mantenimiento'],
      },
    ],
  },
  prestamos: {
    label: 'Prestamos',
    endpoint: '/prestamos',
    idKey: 'id_prestamo',
    columns: [
      { key: 'id_prestamo', label: 'ID' },
      { key: 'id_usuario', label: 'ID Usuario' },
      {
        key: 'usuario',
        label: 'Usuario',
        render: (row) => `${row.nombre_usuario || ''} ${row.apellido_usuario || ''}`.trim() || '-',
      },
      { key: 'fecha_prestamo', label: 'Fecha Prestamo', type: 'date' },
      { key: 'fecha_devolucion_programada', label: 'Fecha Devolucion', type: 'date' },
      { key: 'fecha_devolucion_real', label: 'Fecha Devolucion Real', type: 'date' },
      { key: 'estado', label: 'Estado' },
    ],
    formFields: [
      { key: 'id_usuario', label: 'ID Usuario', type: 'number', required: true },
      { key: 'fecha_prestamo', label: 'Fecha Prestamo', type: 'date', required: true },
      {
        key: 'fecha_devolucion_programada',
        label: 'Fecha Devolucion Programada',
        type: 'date',
        required: true,
      },
      {
        key: 'estado',
        label: 'Estado',
        type: 'select',
        required: true,
        options: ['activo', 'devuelto'],
      },
    ],
  },
};

const REPORT_CONFIG = {
  equipos_mas_prestados: {
    label: 'Equipos más prestados',
    endpoint: '/reportes/equipos_mas_prestados',
    idKey: 'id_equipo',
    columns: [
      { key: 'id_equipo', label: 'ID Equipo' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'marca', label: 'Marca' },
      { key: 'modelo', label: 'Modelo' },
      { key: 'veces_prestado', label: 'Veces Prestado' },
    ],
  },
  prestamos_por_usuario: {
    label: 'Préstamos por usuario',
    endpoint: '/reportes/prestamos_por_usuario',
    idKey: 'id_usuario',
    columns: [
      { key: 'id_usuario', label: 'ID Usuario' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'apellido', label: 'Apellido' },
      { key: 'total_prestamos', label: 'Total de préstamos' },
    ],
  },
  disponibilidad: {
    label: 'Disponibilidad total',
    endpoint: '/equipos/disponibles',
    idKey: 'id_equipo',
    columns: [
      { key: 'id_equipo', label: 'ID Equipo' },
      { key: 'nombre', label: 'Nombre' },
      { key: 'marca', label: 'Marca' },
      { key: 'modelo', label: 'Modelo' },
      { key: 'estado', label: 'Estado' },
    ],
  },
};

const defaultFormByEntity = {
  usuarios: {
    nombre: '',
    apellido: '',
    ci: '',
    tipo_usuario: '',
    telefono: '',
    correo: '',
  },
  equipos: {
    nombre: '',
    descripcion: '',
    marca: '',
    modelo: '',
    codigo_inventario: '',
    estado: 'disponible',
  },
  prestamos: {
    id_usuario: '',
    fecha_prestamo: '',
    fecha_devolucion_programada: '',
    estado: 'activo',
  },
  historial: {
    id_usuario: '',
  },
};

const PAGE_CONFIG = {
  historial: {
    label: 'Historial',
    idKey: 'id_prestamo',
    columns: [
      { key: 'id_prestamo', label: 'ID' },
      { key: 'id_usuario', label: 'ID Usuario' },
      {
        key: 'usuario',
        label: 'Usuario',
        render: (row) => `${row.nombre_usuario || ''} ${row.apellido_usuario || ''}`.trim() || '-',
      },
      { key: 'fecha_prestamo', label: 'Fecha Prestamo', type: 'date' },
      { key: 'fecha_devolucion_programada', label: 'Fecha Devolucion', type: 'date' },
      { key: 'fecha_devolucion_real', label: 'Fecha Devolucion Real', type: 'date' },
      { key: 'estado', label: 'Estado' },
    ],
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('access_token')));
  const [entity, setEntity] = useState('usuarios');
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(defaultFormByEntity.usuarios);
  const [reportType, setReportType] = useState('equipos_mas_prestados');
  const [historyUserId, setHistoryUserId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isCrudEntity = ['usuarios', 'equipos', 'prestamos'].includes(entity);
  const isReportEntity = entity === 'reportes';
  const isHistoryEntity = entity === 'historial';
  const reportConfig = isReportEntity ? REPORT_CONFIG[reportType] : null;
  const config = isReportEntity
    ? reportConfig
    : ENTITY_CONFIG[entity] || PAGE_CONFIG[entity] || { label: entity === 'historial' ? 'Historial' : 'Reportes', columns: [], idKey: 'id' };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (isReportEntity) {
      loadReport(reportType);
      return;
    }

    if (isCrudEntity) {
      loadRows();
      return;
    }

    if (isHistoryEntity) {
      setRows([]);
    }
  }, [entity, isAuthenticated, reportType]);

  const loadRows = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchItems(config.endpoint);
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No se pudo cargar la informacion.');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const loadReport = async (type) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchItems(REPORT_CONFIG[type].endpoint);
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No se pudo cargar el reporte.');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    if (!historyUserId) {
      setError('Ingrese un ID de usuario para buscar el historial.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchItems(`/prestamos/usuario/${historyUserId}`);
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No se pudo cargar el historial.');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setSearch('');
    setIsOpen(false);
    setSelectedItem(null);
    setFormData(defaultFormByEntity[entity]);
    if (isHistoryEntity) {
      setHistoryUserId('');
    }
  }, [entity, isAuthenticated]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      config.columns.some((column) => {
        const rawValue = column.render ? column.render(row) : row[column.key];
        return String(rawValue ?? '').toLowerCase().includes(query);
      }),
    );
  }, [rows, search, config]);

  const openAddModal = () => {
    setModalMode('add');
    setSelectedItem(null);
    setFormData(defaultFormByEntity[entity]);
    setIsOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    const nextForm = { ...defaultFormByEntity[entity] };
    config.formFields.forEach((field) => {
      nextForm[field.key] = item[field.key] ?? nextForm[field.key] ?? '';
    });
    setFormData(nextForm);
    setIsOpen(true);
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Deseas eliminar este registro de ${config.label}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteItem(config.endpoint, item[config.idKey]);
      await loadRows();
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el registro.');
    }
  };

  const handleReturnLoan = async (item) => {
    try {
      await returnLoan(item.id_prestamo);
      await loadRows();
    } catch (err) {
      setError(err.message || 'No se pudo registrar la devolucion.');
    }
  };

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const buildPayload = () => {
    const payload = { ...formData };
    if (entity === 'prestamos' && payload.id_usuario !== '') {
      payload.id_usuario = Number(payload.id_usuario);
    }
    return payload;
  };

  const handleSubmit = async () => {
    try {
      const payload = buildPayload();
      if (modalMode === 'add') {
        await createItem(config.endpoint, payload);
      } else if (selectedItem) {
        await updateItem(config.endpoint, selectedItem[config.idKey], payload);
      }
      setIsOpen(false);
      await loadRows();
    } catch (err) {
      setError(err.message || 'No se pudo guardar el registro.');
    }
  };

  const handleLogin = async ({ username, password }) => {
    setError('');
    setLoading(true);

    try {
      const token = await loginUser(username, password);
      setAuthToken(token);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
    setRows([]);
    setSearch('');
    setError('');
    setIsOpen(false);
    setSelectedItem(null);
    setFormData(defaultFormByEntity.usuarios);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} loading={loading} error={error} />;
  }

  return (
    <div className="py-5 px-5">
      <Navbar
        entity={entity}
        entityLabel={config.label}
        onEntityChange={setEntity}
        onOpen={isCrudEntity ? openAddModal : undefined}
        search={search}
        onSearch={setSearch}
        onLogout={handleLogout}
      />

      {error && <div className="alert alert-error mt-4 text-sm">{error}</div>}
      {loading && <div className="alert mt-4">Cargando {config.label.toLowerCase()}...</div>}

      {isHistoryEntity && (
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="form-control w-full lg:w-80">
            <label className="label">
              <span className="label-text">ID de usuario</span>
            </label>
            <input
              type="number"
              value={historyUserId}
              onChange={(e) => setHistoryUserId(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Ej. 1"
            />
          </div>
          <button className="btn btn-primary" onClick={loadHistory}>
            Buscar historial
          </button>
        </div>
      )}

      {isReportEntity && (
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(REPORT_CONFIG).map(([key, report]) => (
            <button
              className={`btn ${reportType === key ? 'btn-primary' : 'btn-outline'} btn-sm`}
              key={key}
              onClick={() => setReportType(key)}
            >
              {report.label}
            </button>
          ))}
        </div>
      )}

      {!loading && (
        <TableList
          entity={entity}
          columns={config.columns}
          rows={filteredRows}
          idKey={config.idKey}
          onEdit={isCrudEntity ? openEditModal : undefined}
          onDelete={isCrudEntity ? handleDelete : undefined}
          onReturnLoan={entity === 'prestamos' ? handleReturnLoan : undefined}
        />
      )}

      {isCrudEntity && (
        <ModalForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          entityLabel={config.label}
          fields={config.formFields}
          values={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default App
