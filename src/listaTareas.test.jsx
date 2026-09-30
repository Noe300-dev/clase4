// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListaTareas from './listaTareas';

afterEach(() => {
    cleanup(); // limpia el DOM entre tests
});

describe('ListaTareas', () => {
    it('Estado inicial', () => {
        render(<ListaTareas />);
        expect(screen.getByText('No hay tareas')).toBeTruthy();
        expect(screen.getByText('Total: 0')).toBeTruthy();
    });

    it('Agrega una tarea y deja el input vacío', async () => {
        const user = userEvent.setup();
        render(<ListaTareas />);

        const input = screen.getByLabelText('Nueva tarea');
        await user.type(input, 'Comprar pan');
        await user.click(screen.getByRole('button', { name: 'Agregar' }));

        expect(screen.getByText('Comprar pan')).toBeTruthy();
        expect(screen.getByText('Total: 1')).toBeTruthy();
        expect(input.value).toBe('');
    });

    it('No agrega tareas vacías', async () => {
        const user = userEvent.setup();
        render(<ListaTareas />);

        await user.click(screen.getByRole('button', { name: 'Agregar' }));

        expect(screen.getByText('No hay tareas')).toBeTruthy();
        expect(screen.getByText('Total: 0')).toBeTruthy();
    });

    it('No agrega tareas con solo espacios', async () => {
        const user = userEvent.setup();
        render(<ListaTareas />);

        await user.type(screen.getByLabelText('Nueva tarea'), '   ');
        await user.click(screen.getByRole('button', { name: 'Agregar' }));

        expect(screen.getByText('No hay tareas')).toBeTruthy();
        expect(screen.getByText('Total: 0')).toBeTruthy();
    });

    it('Elimina una tarea y la otra sigue', async () => {
        const user = userEvent.setup();
        render(<ListaTareas />);

        const input = screen.getByLabelText('Nueva tarea');
        const boton = screen.getByRole('button', { name: 'Agregar' });

        await user.type(input, 'Comprar pan');
        await user.click(boton);
        await user.type(input, 'Sacar la basura');
        await user.click(boton);
        expect(screen.getByText('Total: 2')).toBeTruthy();

        await user.click(screen.getByRole('button', { name: 'Eliminar Comprar pan' }));

        expect(screen.queryByText('Comprar pan')).toBeNull();
        expect(screen.getByText('Sacar la basura')).toBeTruthy();
        expect(screen.getByText('Total: 1')).toBeTruthy();
    });
});