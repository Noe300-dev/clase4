import { useRef, useState } from 'react';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');
  const siguienteId = useRef(1);

  const agregar = (e) => {
    e.preventDefault();
    const limpio = texto.trim();
    if (!limpio) return;
    setTareas([...tareas, { id: siguienteId.current++, texto: limpio }]);
    setTexto('');
  };

  const eliminar = (id) => setTareas(tareas.filter((t) => t.id !== id));

  return (
    <section>
      <form onSubmit={agregar}>
        <label htmlFor="nueva">Nueva tarea</label>
        <input id="nueva" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>

      {tareas.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tareas.map((t) => (
            <li key={t.id}>
              <span>{t.texto}</span>
              <button onClick={() => eliminar(t.id)} aria-label={`Eliminar ${t.texto}`}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>Total: {tareas.length}</p>
    </section>
  );
}