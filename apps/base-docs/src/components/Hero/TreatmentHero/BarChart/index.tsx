import React from 'react';
import styles from './styles.module.css';

export default function BarChart() {
  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <div>
      <div className={styles.chartColumnsContainer}>
        {chartData.map((chartColumn, index) => {
          return (
            <ChartColumn
              key={chartColumn.name}
              columnData={chartColumn}
              columnHeight={(chartColumn.value / maxValue) * 100}
              displayType={
                index === 0
                  ? 'chartColumnBase'
                  : index % 2 === 0
                  ? 'chartColumnEven'
                  : 'chartColumnOdd'
              }
            />
          );
        })}
      </div>
      <div className={styles.chartLegendContainer}>
        <div className={styles.chartLegend}>
        Cost per transaction based on 90 day moving average.
        </div>
        <a className={styles.chartLegend} href="https://l2beat.com/scaling/costs" target="_blank">
          Source: L2Beat
        </a>
      </div>
    </div>
  );
}

function ChartColumn({ columnData, columnHeight, displayType }: ChartColumnProps) {
  return (
    <div className={styles.chartColumnContainer}>
      <div className={styles.chartColumnValue}>${columnData.value}</div>
      <div style={{ height: `${columnHeight}%` }} className={styles[displayType]}>
        <div className={styles.chartColumnName}>{columnData.name.toUpperCase()}</div>
      </div>
    </div>
  );
}

const chartData = [
  {
    name: 'BASE',
    value: 0.0292,
  },
  {
    name: 'ARBITRUM',
    value: 0.0673,
  },
  {
    name: 'OPTIMISM',
    value: 0.1487,
  },
  {
    name: 'BLAST',
    value: 0.1043,
  },
];

type ChartColumnProps = {
  columnData: ColumnData;
  columnHeight: number;
  displayType: string;
};

type ColumnData = {
  name: string;
  value: number;
};
