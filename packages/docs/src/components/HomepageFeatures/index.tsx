import clsx from 'clsx';
import type { ReactNode } from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🚀 Easy Installation',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <code>setup</code> is designed to be installed quickly and effortlessly. With just a <code>single command</code>
        , you can set up your project environment instantly.
      </>
    ),
  },
  {
    title: '🎯 Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Let setup handle the <code>configuration</code>, so you can focus on development. Skip the hassle of setting up
        environments and get straight to building.
      </>
    ),
  },
  {
    title: '⚡ Flexible & Extensible',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <code>setup</code> supports various configurations and can be easily customized or extended to fit your needs.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
