// Stocky chart palette: blue (primary), green (positive), yellow (secondary)
export const CHART_COLORS = {
  blue: "#3b82f6",
  blueLight: "#60a5fa",
  green: "#10b981",
  greenLight: "#34d399",
  yellow: "#f59e0b",
  yellowLight: "#fbbf24",
  teal: "#14b8a6",
  slate: "#64748b",
};

export const CHART_PALETTE = [
  CHART_COLORS.blue,
  CHART_COLORS.green,
  CHART_COLORS.yellow,
  CHART_COLORS.teal,
  CHART_COLORS.blueLight,
  CHART_COLORS.greenLight,
  CHART_COLORS.yellowLight,
  CHART_COLORS.slate,
];

const axisColor = "#6b7280";

export function pieChartOptions({ title, data, formatter }) {
  return {
    color: CHART_PALETTE,
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(17, 24, 39, 0.92)",
      borderWidth: 0,
      textStyle: { color: "#f9fafb" },
      formatter: formatter || "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: 0,
      textStyle: { color: axisColor },
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: ["42%", "68%"],
        center: ["50%", "46%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { color: axisColor },
        data,
      },
    ],
  };
}

export function barChartOptions({ categories, series, horizontal = false }) {
  const categoryAxis = {
    type: "category",
    data: categories,
    axisLabel: { color: axisColor, interval: 0, rotate: horizontal ? 0 : 30 },
    axisLine: { lineStyle: { color: "#e5e7eb" } },
  };
  const valueAxis = {
    type: "value",
    axisLabel: { color: axisColor },
    splitLine: { lineStyle: { color: "#f3f4f6" } },
  };

  return {
    color: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow, CHART_COLORS.teal],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(17, 24, 39, 0.92)",
      borderWidth: 0,
      textStyle: { color: "#f9fafb" },
    },
    legend: {
      top: 0,
      textStyle: { color: axisColor },
    },
    grid: { left: "3%", right: "4%", bottom: "8%", containLabel: true },
    xAxis: horizontal ? valueAxis : categoryAxis,
    yAxis: horizontal ? categoryAxis : valueAxis,
    series: series.map((s, i) => ({
      ...s,
      type: "bar",
      barMaxWidth: 36,
      itemStyle: {
        borderRadius: horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0],
        color: s.color || [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow][i % 3],
      },
    })),
  };
}

export function lineChartOptions({ categories, series }) {
  const lineColors = [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.yellow];

  return {
    color: lineColors,
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(17, 24, 39, 0.92)",
      borderWidth: 0,
      textStyle: { color: "#f9fafb" },
    },
    legend: {
      top: 0,
      textStyle: { color: axisColor },
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: categories,
      axisLabel: { color: axisColor },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: axisColor },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: series.map((s, i) => ({
      ...s,
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 7,
      lineStyle: { width: 3, color: lineColors[i % lineColors.length] },
      itemStyle: { color: lineColors[i % lineColors.length] },
      areaStyle: {
        opacity: 0.08,
        color: lineColors[i % lineColors.length],
      },
    })),
  };
}
