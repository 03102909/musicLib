import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { getAlbumsCountByYear, getAlbumsCountByGenre } from "../services/api";
import type { ChartDataYear, ChartDataGenre } from "../types";

export default function StatisticsPage() {
  const { data: yearData = [], isLoading: isYearLoading } = useQuery({
    queryKey: ["charts", "year"],
    queryFn: getAlbumsCountByYear,
  });

  const { data: genreData = [], isLoading: isGenreLoading } = useQuery({
    queryKey: ["charts", "genre"],
    queryFn: getAlbumsCountByGenre,
  });

  const genreChartData = [
    ["Жанр", "Кількість"],
    ...genreData.map((g: ChartDataGenre) => [g.genre, g.count]),
  ];

  const yearChartData = [
    ["Рік", "Кількість"],
    ...yearData.map((y: ChartDataYear) => [y.year, y.count]),
  ];

  return (
    <div>
      <section className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
          Статистика
        </h1>
        <p className="text-muted text-lg">
          Аналітика каталогу музичних альбомів
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-200 rounded-lg border border-base-300/50 p-5 min-h-[400px]">
          <h2 className="font-display text-2xl font-semibold text-cream mb-5">
            Альбоми за жанрами
          </h2>
          {isGenreLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner text-forest w-10 h-10"></span>
            </div>
          ) : genreData.length === 0 ? (
            <div className="text-center text-muted mt-10">
              Немає даних для відображення
            </div>
          ) : (
            <Chart
              chartType="PieChart"
              width="100%"
              height="350px"
              data={genreChartData}
              options={{
                backgroundColor: "transparent",
                legend: { textStyle: { color: "#9ca3af" } },
                pieSliceText: "value",
                pieSliceBorderColor: "#111827",
                chartArea: { width: "90%", height: "80%" },
                colors: [
                  "#2d6a4f",
                  "#9b2226",
                  "#ca6702",
                  "#115e59",
                  "#bbd0ff",
                  "#005f73",
                ],
              }}
            />
          )}
        </div>

        <div className="bg-base-200 rounded-lg border border-base-300/50 p-5 min-h-[400px]">
          <h2 className="font-display text-2xl font-semibold text-cream mb-5">
            Альбоми за роками випуску
          </h2>
          {isYearLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner text-forest w-10 h-10"></span>
            </div>
          ) : yearData.length === 0 ? (
            <div className="text-center text-muted mt-10">
              Немає даних для відображення
            </div>
          ) : (
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="350px"
              data={yearChartData}
              options={{
                backgroundColor: "transparent",
                legend: { position: "none" },
                hAxis: {
                  textStyle: { color: "#9ca3af" },
                  gridlines: { color: "transparent" },
                  title: "Рік випуску",
                  titleTextStyle: { color: "#9ca3af", italic: false },
                },
                vAxis: {
                  textStyle: { color: "#9ca3af" },
                  gridlines: { color: "#374151" },
                  title: "Кількість альбомів",
                  titleTextStyle: { color: "#9ca3af", italic: false },
                  minValue: 0,
                  format: "#",
                },
                chartArea: { width: "80%", height: "70%" },
                colors: ["#2d6a4f"],
                bar: { groupWidth: "60%" },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
