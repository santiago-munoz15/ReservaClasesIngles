import {userContext} from 'react';
import {ReservaContext} from '../context/reservaContext';

export default function useReserva() {
    const contexto = useContext(ReservaContext);
    if(!contexto){
        throw new Error('useReserva debe estar dentro de <ReservaProvider>');
    }
    return contexto;
}