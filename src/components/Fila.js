import { useState, useEffect } from "react";

function Fila() {
    const [filaOk, setValueFila] = useState("");
    const [tempoMax, setValueTime] = useState("");
    const url = process.env.REACT_APP_API;

    useEffect(() => {
        async function getQueue() {
            const fila = await verificar();
            const filaMatch = fila.match(/FilaOk:\s*(\d+)/);
            const tempoMatch = fila.match(/Tempo MAX Para enviar:\s*(\d+)/);
            const filaOk = filaMatch ? filaMatch[1] : null;
            const tempoMax = tempoMatch ? tempoMatch[1] : null;
            setValueFila(filaOk);
            setValueTime(tempoMax);
        }
        getQueue();
        const interval = setInterval(getQueue, 15000);
        return () => clearInterval(interval);
    }, [])
    
    async function verificar(){
        const response = await fetch(url)
        const result = await response.text();
        return result;
    }

    return (
        <>
        <div>Envios na fila: {filaOk}</div>
        <div>Tempo para enviar: {tempoMax} minutos</div>
        </>
    );
}

export default Fila;