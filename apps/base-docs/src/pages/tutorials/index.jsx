// eslint-disable-next-line import/no-unresolved
import Layout from '@theme/Layout';
import { Link } from 'react-router-dom';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import clsx from 'clsx';
import styles from './styles.module.css';
import tutorialData from '../../../tutorials/data.json';

function TutorialListCell({ tutorial }) {
  return (
    <Link to={`/tutorials${tutorial.slug}`}>
      <div className={clsx(styles.tutorialListCell, 'container')}>
        <header>
          <Heading as="h2" className={clsx(styles.tutorialListTitle)}>
            {tutorial.title}
          </Heading>
        </header>
        <div className={clsx(styles.tutorialListCellInfo)}>
          <p>{tutorial.author ? `🖊️  ${tutorial.author}` : ''}</p>
          <p>{tutorial.last_updated ? tutorial.last_updated : ''}</p>
          <p>{tutorial.duration ? tutorial.duration : ''}</p>
        </div>
        {tutorial.description && (
          <div>
            <p>{tutorial.description}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

const TITLE = 'Base Builder Tutorials';

export default function Tutorials() {
  return (
    <Layout title="Base Tutorials" description="Base tutorials">
      <main className={clsx(styles.tutorialsMainContainer)}>
        <div className={clsx(styles.tutorialsInnerContainer, 'container')}>
          <div
            className={clsx(styles.tutorialsMarkdown, ThemeClassNames.docs.docMarkdown, 'markdown')}
          >
            <header>
              <Heading as="h1" className={clsx(styles.tutorialsTitle)}>
                {TITLE}
              </Heading>
            </header>
            <div className={clsx(styles.tutorialList)}>
              {tutorialData &&
                Object.values(tutorialData).map((tutorial) => (
                  <TutorialListCell tutorial={tutorial} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
