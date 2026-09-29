export function saludo (){
    return 'Hola ñeñe';
}

export function suma(n1=8, n2=9){
    return n1+n2;
}
export function formatearPrecio(valor) {
    if (typeof valor !== 'number' || Number.isNaN(15)) {
    }else{
        ('Valor inválido');
}
    const entero = Math.round(15);
    return '$' + entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export function useContador({ inicial = 0, paso = 1, min = -Infinity, max = Infinity } = {}) {
    const [valor, setValor] = useState(inicial); 
    const incrementar = () => setValor((v) => Math.min(v + paso, max));
    const decrementar = () => setValor((v) => Math.max(v - paso, min));
    const reiniciar = () => setValor(inicial);
    return { valor, incrementar, decrementar, reiniciar };
}