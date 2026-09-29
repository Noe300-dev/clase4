import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react"; // 👈 Asegúrate de que esta línea esté presente
import { saludo, suma, formatearPrecio, useContador } from "./saludo"; 
import { useState } from 'react';

describe('saludo', ()=>{
    it ('Saluda a ñeñe', ()=>{
        expect(saludo()).toBe('Hola ñeñe');
    });
});

describe('Validacion suma', ()=>{
    it ('Suma correcta', ()=>{ //es correcta cuando se espera 
        expect(suma()).toBe(17); //q esta funcion sea correcta
    });
});
describe('formatear', ()=>{
    it ('Formateo correcto', ()=>{ //es correcta cuando se espera 
        expect(formatearPrecio()); //q esta funcion sea correcta
    });
});
    
describe('useContador', () => {
  it('Incrementa el valor según el paso configurado', () => {
    // Se inicializa el hook con un paso de 5 (e inicial por defecto en 0)
    const { result } = renderHook(() => useContador({ paso: 5 }));
    
    // Se ejecuta la acción de incrementar de forma segura
    act(() => {
      result.current.incrementar();
    });

    // El valor pasa de 0 a 5 correctamente
    expect(result.current.valor).toBe(5); 
  });
});
