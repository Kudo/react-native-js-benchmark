import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Chart from '../components/Chart';
import Data from '../public/data.json';

import type { ChartData } from '../types';

interface SectionProps {
  name: string;
  description: string;
  chartData: ChartData;
}
function Section(props: SectionProps) {
  return (
    <section>
      <h2 className={styles.sectionTitle}>
        <a id={props.name} className={styles.sectionAnchor} href={`#${props.name}`}>
          {props.name}
        </a>
      </h2>
      <p>{props.description}</p>
      <Chart data={props.chartData} />
      {props.chartData.comment ? (
        <code className={styles.comment}>{props.chartData.comment}</code>
      ) : null}
    </section>
  );
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>react-native-js-benchmark</title>
        <meta name="description" content="React Native benchmark for JavaScript runtimes" />
        <link
          rel="icon"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/svgs/brands/js-square.svg"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://github.com/Kudo/react-native-js-benchmark">react-native-js-benchmark</a>
        </h1>
        <p className={styles.description}>React Native benchmark for JavaScript runtimes.</p>

        <section className={styles.measureInfo}>
          <h2>Measurement Information</h2>
          <ul>
            <li>Google Pixel 6 (Android 12)</li>
            <li>React Native 0.68.1</li>
            <li>
              jsc:{' '}
              <a href="https://www.npmjs.com/package/jsc-android/v/250230.2.1">
                jsc-android@250230.2.1
              </a>
            </li>
            <li>
              v8-android-jit:{' '}
              <a href="https://www.npmjs.com/package/v8-android-jit/v/10.100.0">
                v8-android-jit@10.100.0
              </a>
            </li>
            <li>
              v8-android-nointl:{' '}
              <a href="https://www.npmjs.com/package/v8-android-nointl/v/9.93.0">
                v8-android-nointl@10.100.0
              </a>
            </li>
            <li>
              hermes:{' '}
              <a href="https://www.npmjs.com/package/hermes-engine/v/0.11.0">
                hermes-engine@0.11.0
              </a>
            </li>
          </ul>
        </section>

        <Section
          name="RenderComponentThroughput"
          description="Aims at the computing performance (higher is better)"
          chartData={Data.RenderComponentThroughput}
        />

        <hr className={styles.divider} />

        <Section
          name="RenderComponentMemory"
          description="Aims at the memory usage"
          chartData={Data.RenderComponentMemory}
        />

        <hr className={styles.divider} />

        <Section
          name="TTI"
          description="Aims at the app startup Time-To-Interactive (lower is better)"
          chartData={Data.TTI}
        />

        <hr className={styles.divider} />

        <Section
          name="ApkSize"
          description="Aims at apk size (lower is better)"
          chartData={Data.ApkSize}
        />

      </main>
    </div>
  );
};

export default Home;
