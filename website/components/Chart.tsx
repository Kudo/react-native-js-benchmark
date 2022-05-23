import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from '../styles/Chart.module.css';
import type { ChartData } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const COLOR_PALETTE = {
  jsc: ['#ffca3a', '#ffa33a', '#ffb03a', '#ffbd3a', '#ffd73a', '#ffe43a'],
  v8: ['#8ac926', '#5e891a', '#ade05b', '#6d9e1e', '#a2dc46', '#7bb422'],
  hermes: ['#1982c4', '#19a4c4', '#1999ca', '#198dc4', '#1971c4', '#1966c4'],
};

const COLOR_BUCKETS: Record<string, string> = {};

function getBackgroundColor(jsEngine: string): string | undefined {
  if (COLOR_BUCKETS[jsEngine] != null) {
    return COLOR_BUCKETS[jsEngine];
  }

  let result: string | undefined = undefined;
  if (jsEngine.startsWith('jsc')) {
    result = COLOR_PALETTE.jsc.pop();
  } else if (jsEngine.startsWith('v8')) {
    result = COLOR_PALETTE.v8.pop();
  } else if (jsEngine.startsWith('hermes')) {
    result = COLOR_PALETTE.hermes.pop();
  }
  if (result === undefined) {
    result = '#b726c9';
  }

  COLOR_BUCKETS[jsEngine] = result;
  return result;
}

export interface Props {
  data: ChartData;
}

export default function ChartWithSection(props: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 18,
          },
        },
      },
    },
  };

  const data = {
    labels: props.data.testGroups,
    datasets: props.data.dataSet.map((data) => ({
      label: data.jsEngine,
      data: data.groupData,
      backgroundColor: getBackgroundColor(data.jsEngine),
    })),
  };

  return <Bar className={styles.container} options={options} data={data} />;
}
