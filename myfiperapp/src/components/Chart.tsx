"use client";
import { Operation } from "@/core/layouts/domain";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  // Methods for the chart
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Diagrama de Barras of Chart.js",
    },
  },
};

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface IProps {
  operations: Operation[];
}

const Chart = ({ operations }: IProps) => {
  const [filteredIngresosData, setFilteredIngresosData] = useState<number[]>(
    []
  );
  const [filteredGastosData, setFilteredGastosData] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const filterData = () => {
      let filteredIngresos = new Array(labels.length).fill(0);
      let filteredGastos = new Array(labels.length).fill(0);

      operations.forEach((operation) => {
        if (operation.createdAt) {
          const dateTemp: Date = new Date(operation.createdAt);
          const date = new Date(dateTemp);
          const month = date.getMonth();
          const year = date.getFullYear();

          if (
            (selectedMonth === null || month === selectedMonth) &&
            (selectedYear === null || year === selectedYear)
          ) {
            if (operation.operationtypeId === 1) {
              filteredIngresos[month] += operation.mount;
              console.log("filtered1", filteredIngresos[month]);
            } else {
              filteredGastos[month] += operation.mount;
              console.log("filtered1", filteredGastos[month]);
            }
          }
        }
      });
      setFilteredIngresosData(filteredIngresos);
      setFilteredGastosData(filteredGastos);
    };

    if (operations.length > 0) {
      filterData();
    }
  }, [operations, selectedMonth, selectedYear]);

  return (
    <div className="h-screen w-full sm:w-2/3 mx-auto ">
      <div className="flex flex-col gap-4">
        {/* // Filtros por mes y año */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center my-4">
          <div className="flex gap-2 justify-center items-center">
            <label htmlFor="month">Mes</label>
            <select
              id="month"
              value={selectedMonth === null ? "All" : String(selectedMonth + 1)}
              onChange={(e) => {
                if (e.target.value === "All") {
                  setSelectedMonth(null);
                } else {
                  setSelectedMonth(Number(e.target.value) - 1);
                }
              }}
              className="px-4 py-2 border shadow-lg border-green-800 rounded-lg"
            >
              <option value="All">All</option>
              {labels.map((label, index) => {
                return (
                  <option key={index} value={String(index + 1)}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label htmlFor="year">Año</label>
            <select
              id="year"
              value={selectedYear === null ? "All" : String(selectedYear)}
              onChange={(e) => {
                if (e.target.value === "All") {
                  setSelectedYear(null);
                } else {
                  setSelectedYear(Number(e.target.value));
                }
              }}
              className="px-4 py-2 border shadow-lg border-green-800 rounded-lg"
            >
              <option value="All">All</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>

      <Bar
        options={options}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Ingresos",
              data: filteredIngresosData,
              borderColor: "green",
              backgroundColor: "green",
            },
            {
              label: "Gastos",
              data: filteredGastosData,
              borderColor: "red",
              backgroundColor: "red",
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;

// export const data = {
//   labels,
//   datasets: [
//     {
//       labels: "Dataset 1",
//       data: [100, 200, 300, 400, 500, 600, 700],
//       borderColor: "green",
//       backgroundColor: "green",
//     },
//   ],
// };
