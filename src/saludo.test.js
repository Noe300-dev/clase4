// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { saludo, suma, formatearPrecio, aplicarDescuento, useContador } from "./saludo";

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
    it ('Formateo correcto', ()=>{
        expect(formatearPrecio(1000)).toBe('$1.000');
    });

    it.each([
        [0, '$0'],
        [500, '$500'],
        [1000, '$1.000'],
        [1234567, '$1.234.567'],
    ])('formatearPrecio(%s) da %s', (entrada, esperado)=>{
        expect(formatearPrecio(entrada)).toBe(esperado);
    });

    it ('Redondea decimales', ()=>{
        expect(formatearPrecio(1999.6)).toBe('$2.000');
    });

    it ('Lanza error con abc', ()=>{
        expect(()=> formatearPrecio('abc')).toThrow();
    });

    it ('Lanza error con NaN', ()=>{
        expect(()=> formatearPrecio(NaN)).toThrow();
    });
});

describe('descuento', ()=>{
    it ('0% no cambia el precio', ()=>{
        expect(aplicarDescuento(1000, 0)).toBe(1000);
    });

    it ('15% de descuento', ()=>{
        expect(aplicarDescuento(1000, 15)).toBe(850);
    });

    it ('100% deja el precio en 0', ()=>{
        expect(aplicarDescuento(1000, 100)).toBe(0);
    });

    it ('Lanza error con 150%', ()=>{
        expect(()=> aplicarDescuento(1000, 150)).toThrow();
    });
});

describe('useContador', ()=>{
    it ('Parte en 0', ()=>{
        const { result } = renderHook(()=> useContador());
        expect(result.current.valor).toBe(0);
    });
        it ('Acepta un valor inicial personalizado', ()=>{
        const { result } = renderHook(()=> useContador({ inicial: 10 }));
        expect(result.current.valor).toBe(10);
    });

    it ('Incrementa y decrementa con paso de 5', ()=>{
        const { result } = renderHook(()=> useContador({ paso: 5 }));
        act(()=>{
            result.current.incrementar();
        });
        expect(result.current.valor).toBe(5);
        act(()=>{
            result.current.decrementar();
        });
        expect(result.current.valor).toBe(0);
    });

    it ('Nunca supera max', ()=>{
        const { result } = renderHook(()=> useContador({ inicial: 9, max: 10 }));
        act(()=>{
            result.current.incrementar();
        });
        act(()=>{
            result.current.incrementar();
        });
        expect(result.current.valor).toBe(10);
    });

    it ('Nunca baja de min', ()=>{
        const { result } = renderHook(()=> useContador({ inicial: 1, min: 0 }));
        act(()=>{
            result.current.decrementar();
        });
        act(()=>{
            result.current.decrementar();
        });
        expect(result.current.valor).toBe(0);
    });

    it ('Incrementa', ()=>{
        const { result } = renderHook(()=> useContador());
        act(()=>{
            result.current.incrementar();
        });
        expect(result.current.valor).toBe(1);
    });

    it ('Decrementa', ()=>{
        const { result } = renderHook(()=> useContador());
        act(()=>{
            result.current.decrementar();
        });
        expect(result.current.valor).toBe(-1);
    });

    it ('Reinicia', ()=>{
        const { result } = renderHook(()=> useContador({ inicial: 5 }));
        act(()=>{
            result.current.incrementar();
        });
        act(()=>{
            result.current.reiniciar();
        });
        expect(result.current.valor).toBe(5);
    });
});