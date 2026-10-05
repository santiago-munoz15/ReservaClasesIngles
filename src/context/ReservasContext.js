import React, { createContext, useContext, useState } from "react";
import { CLASES } from "../data/clases";

const ReservasContext = createContext();

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [clases, setClases] = useState(CLASES);

  const agregarReserva = (reserva) => {
    setReservas((prevReservas) => [...prevReservas, reserva]);

    setClases((prevClases) =>
      prevClases.map((clase) => {
        if (clase.id === reserva.id && clase.cupos > 0) {
          return {
            ...clase,
            cupos: clase.cupos - 1,
          };
        }

        return clase;
      })
    );
  };

  const eliminarReserva = (idReserva) => {
    setReservas((prevReservas) =>
      prevReservas.filter((reserva) => reserva.id !== idReserva)
    );

    setClases((prevClases) =>
      prevClases.map((clase) => {
        if (clase.id === idReserva) {
          return {
            ...clase,
            cupos: clase.cupos + 1,
          };
        }

        return clase;
      })
    );
  };

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        clases,
        agregarReserva,
        eliminarReserva,
      }}
    >
      {children}
    </ReservasContext.Provider>
  );
}

export function useReservas() {
  return useContext(ReservasContext);
}