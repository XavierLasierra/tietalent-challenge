import React from "react";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { getRandomColor } from "@/utils/getRandomColor";
import styles from "./TtRadarChart.module.scss";

export interface TTRadarChartDataset {
  label: string;
  data: number[];
}

export interface TTRadarChartProps {
  title: string;
  labels: string[];
  datasets: TTRadarChartDataset[];
  emptyText?: string;
}

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TtRadarChart = ({
  labels,
  datasets,
  emptyText = "No data",
}: TTRadarChartProps) => {
  const data: ChartData<"radar"> = {
    labels,
    datasets: datasets.map(({ data, label }) => ({
      label,
      data,
      backgroundColor: getRandomColor(),
    })),
  };

  return (
    <div className={styles.chartBox}>
      {datasets.length > 0 ? <Radar data={data} /> : <span>{emptyText}</span>}
    </div>
  );
};

export default TtRadarChart;
