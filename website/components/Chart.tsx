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

const COLOR_BUCKETS = {
  jsc: '#ffca3a',
  v8: '#8ac926',
  hermes: '#1982c4',
};

function getBackgroundColor(jsEngine: string): string | undefined {
  const randomAlpha = 'ff';
  // const randomAlpha = Math.floor(Math.random() * 150 + 100).toString(16);
  if (jsEngine.startsWith('jsc')) {
    return `${COLOR_BUCKETS.jsc}${randomAlpha}`;
  }
  if (jsEngine.startsWith('v8')) {
    return `${COLOR_BUCKETS.v8}${randomAlpha}`;
  }
  if (jsEngine.startsWith('hermes')) {
    return `${COLOR_BUCKETS.hermes}${randomAlpha}`;
  }
  return undefined;
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
    datasets: props.data.testGroups.map((_, i) => ({
      label: props.data.dataSet[i].jsEngine,
      data: props.data.dataSet[i].groupData,
      backgroundColor: getBackgroundColor(props.data.dataSet[i].jsEngine),
    })),
  };

  return <Bar className={styles.container} options={options} data={data} />;
}
