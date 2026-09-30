import { useState } from 'react';

export function saludo() {
    return 'Hola ñeñe';
}

export function suma(n1 = 8, n2 = 9) {
    return n1 + n2;
}

export function formatearPrecio(valor) {
    if (typeof valor !== 'number' || Number.isNaN(valor)) {
        throw new Error('Valor inválido');
    }
    const entero = Math.round(valor);
    return '$' + entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function aplicarDescuento(precio, porcentaje) {
    if (porcentaje < 0 || porcentaje > 100) {
        throw new Error('El porcentaje debe estar entre 0 y 100');
    }
    return precio * (1 - porcentaje / 100);
}

export function useContador({ inicial = 0, paso = 1, min = -Infinity, max = Infinity } = {}) {
    const [valor, setValor] = useState(inicial);
    const incrementar = () => setValor((v) => Math.min(v + paso, max));
    const decrementar = () => setValor((v) => Math.max(v - paso, min));
    const reiniciar = () => setValor(inicial);
    return { valor, incrementar, decrementar, reiniciar };
}