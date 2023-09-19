const { createAction } = require('kbar');
const kebabCase = require('lodash/kebabCase');
const uniqBy = require('lodash/uniqBy');
const path = require('path');

function arrayToObject(array) {
  return array.reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
  }, {});
}

function combineDocs({ docs = [], ...rest }) {
  let array = [...docs];

  for (const key in rest) {
    if (Object.hasOwn(rest, key)) {
      array = [...array, ...rest[key]];
    }
  }

  return array;
}

function getKBarActions({ docs, sidebars, route }) {
  const idMap = arrayToObject(docs);

  function getNameForDoc(id) {
    return idMap[id]?.title ?? 'Could not match name';
  }

  function getSlugForDoc(id) {
    return idMap[id]?.slug;
  }

  function flatten(item, parent) {
    if (item.type === 'category') {
      const name = item.label;
      const kebabCaseId = kebabCase(name);
      const id = parent ? path.join(parent, kebabCaseId) : kebabCaseId;
      return item.items.flatMap((next) => {
        return [
          {
            parent,
            name,
            id,
            pictogram: item.customProps?.kbar?.pictogram,
            spotSquare: item.customProps?.kbar?.spotSquare,
            subtitle: item.customProps?.kbar?.description,
            priority: item.customProps?.kbar?.priority,
          },
          ...flatten(next, id),
        ];
      });
    }

    if (item.type === 'doc') {
      const name = item.customProps?.kbar?.label ?? getNameForDoc(item.id);
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
      return [{ parent, id: item.id, name, subtitle, priority }];
    }

    if (item.type === 'ref') {
      const name = getNameForDoc(item.id);
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
      return [
        createAction({
          name,
          parent,
          subtitle,
          priority,
        }),
      ];
    }

    if (item.type === 'link') {
      return [];
    }

    const name = '';
    return [
      createAction({
        name,
        parent,
      }),
    ];
  }

  return uniqBy(
    combineDocs(sidebars).flatMap((item) => flatten(item)),
    'id',
  ).map((item) => {
    let slug = getSlugForDoc(item.id);
    if (slug && route !== '/' && route !== undefined) {
      slug = `${route}${slug}`;
    }
    const frontmatter = idMap[item.id]?.frontMatter;
    return {
      section: 'Documentation',
      slug,
      subtitle: frontmatter?.description,
      keywords: frontmatter?.keywords?.join(' '),
      ...item,
    };
  });
}

module.exports = {
  getKBarActions,
};
