import { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Link } from 'react-router-dom';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';
import tutorialData from '../../../tutorials/data.json';
import authors from '@app/base-docs/static/json/authors.json';
import { useHistory, useLocation } from 'react-router-dom';

const TagList = [
  'all',
  'smart contracts',
  'nodes',
  'nft',
  'account abstraction',
  'cross-chain',
  'oracles',
  'vrf',
  'frames',
  'frontend',
  'OnchainKit',
  'Smart Wallet',
  'Paymaster',
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TagChip({ tag, isSelected, setSelectedTag }) {
  const select = useCallback(() => {
    setSelectedTag(tag);
  }, [tag, setSelectedTag]);

  return (
    <button
      className={clsx(styles.tagButton, isSelected ? styles.tagButtonActive : '')}
      type="button"
      onClick={select}
    >
      <div className={clsx(styles.tag)}>
        <span>{tag}</span>
      </div>
    </button>
  );
}

const handleContainerClick = (event, tutorial, history) => {
  if (event.target.closest('a')) return;
  history.push(`/tutorials${tutorial.slug}`);
};

const handleClick = (event) => {
  event.stopPropagation();
};

function TutorialListCell({ tutorial }) {
  const history = useHistory();
  const authorData = authors[tutorial.author];
  return (
    // <Link to={`/tutorials${tutorial.slug}`}>
    <div
      onClick={(event) => {
        handleContainerClick(event, tutorial, history);
      }}
      role="button"
      tabIndex={0}
    >
      <div className={clsx(styles.tutorialListCell, 'container')}>
        <header>
          <h2 className={clsx(styles.tutorialListTitle)}>{tutorial.title}</h2>
        </header>
        <div className={clsx(styles.tutorialListCellInfo)}>
          {authorData?.link && (
            <a className={clsx(styles.tutorialAuthor)} href={authorData.link} onClick={handleClick}>
              <p>{`🖊️  ${authorData.name}`}</p>
            </a>
          )}
          {authorData && !authorData.link && <p>{`🖊️  ${authorData.name}`}</p>}
          {!authorData && <p>{tutorial.author ? `🖊️  ${tutorial.author}` : ''}</p>}
          <p>{tutorial.last_updated ? tutorial.last_updated : ''}</p>
          <p>{tutorial.duration ? tutorial.duration : ''}</p>
        </div>
        {tutorial.description && (
          <div>
            <p>{tutorial.description}</p>
          </div>
        )}
        <div className={clsx(styles.tutorialListCellInfo)}>
          {tutorial.tags?.map((tag) => (
            <p key={tag} className={clsx(styles.tutorialListTag)}>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
    // </Link>
  );
}

const TITLE = 'Base Builder Tutorials';

export default function Tutorials() {
  const [selectedTag, setSelectedTag] = useState('all');
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const tag = query.get('tag');
    if (tag) {
      setSelectedTag(tag);
    }
  }, [query]);

  const selectTag = useCallback(
    (tag) => {
      history.push(`?tag=${tag}`);
    },
    [history],
  );

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
            <div className={clsx(styles.tagList)}>
              {TagList.map((tag) => (
                <TagChip
                  tag={tag}
                  isSelected={selectedTag === tag}
                  setSelectedTag={selectTag}
                  key={tag}
                />
              ))}
            </div>
            <div className={clsx(styles.tutorialList)}>
              {tutorialData &&
                Object.values(tutorialData)
                  .filter((tutorial) => tutorial.tags)
                  .filter((tutorial) =>
                    selectedTag == 'all' ? tutorial : tutorial.tags.includes(selectedTag),
                  )
                  .map((tutorial) => <TutorialListCell key={tutorial.slug} tutorial={tutorial} />)}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
