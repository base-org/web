/* eslint-disable */
import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import BrowserOnly from '@docusaurus/BrowserOnly';
import DocFeedback from '../../../components/DocFeedback/index.tsx';
import DocChat from '../../../components/DocChat/index.tsx';
import tutorialData from '../../../../tutorials/data.json';
import authors from '@app/base-docs/static/json/authors.json';

import styles from './styles.module.css';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({ children }) {
  const { frontMatter } = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const tutorial =
    frontMatter && frontMatter.slug ? tutorialData[frontMatter.slug.substring(1)] : null;
  const authorData = tutorial ? authors[tutorial.author] : null;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <div>
          <header>
            <Heading as="h1">{syntheticTitle}</Heading>
          </header>
          {tutorial && authorData && (
            <div className={clsx(styles.tutorialInfo)}>
              {authorData && authorData.link && (
                <a
                  className={clsx(styles.tutorialAuthor)}
                  href={authorData.link}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <p>{`🖊️ ${authorData.name}`}</p>
                </a>
              )}
              {authorData && !authorData.link && <p>{`🖊️  ${authorData.name}`}</p>}
              {!authorData && <p>{tutorial.author ? `🖊️  ${tutorial.author}` : ''}</p>}
              <p>{tutorial.last_updated ? tutorial.last_updated : ''}</p>
              <p>{tutorial.duration ? tutorial.duration : ''}</p>
            </div>
          )}
        </div>
      )}
      <MDXContent>{children}</MDXContent>
      <BrowserOnly>
        {() => (
          <>
            {/* <DocFeedback /> - Disabled while team decides how to rework */}
            {/* <DocChat /> */}
          </>
        )}
      </BrowserOnly>
    </div>
  );
}
