import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';

import { UsernameTextRecordKeys, textRecordsKeywords } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useId, useState } from 'react';

export type UsernameKeywordsFieldProps = {
  labelChildren?: ReactNode;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameKeywordsField({
  labelChildren = 'Areas of expertise',
  onChange,
  value,
  disabled = false,
}: UsernameKeywordsFieldProps) {
  const [keywords, setKeywords] = useState<string[]>(
    value.split(',').filter((keyword) => !!keyword),
  );

  const onClickKeyword = useCallback(
    (keyword: string) => {
      if (keywords.includes(keyword)) {
        setKeywords((previousKeywords) => previousKeywords.filter((k) => k !== keyword));
      } else {
        setKeywords([...keywords, keyword]);
      }
    },
    [keywords],
  );

  useEffect(() => {
    onChange(UsernameTextRecordKeys.Keywords, keywords.join(','));
  }, [keywords, onChange]);

  useEffect(() => {
    setKeywords(value.split(',').filter((keyword) => !!keyword));
  }, [value]);

  const usernameKeywordsFieldId = useId();

  return (
    <Fieldset>
      {labelChildren && <Label htmlFor={usernameKeywordsFieldId}>{labelChildren}</Label>}

      <ul className="flex flex-wrap gap-2">
        {textRecordsKeywords.map((keyword) => (
          <li key={keyword}>
            <button
              type="button"
              className={classNames(
                'flex items-center gap-2 rounded-xl border border-gray-40/20 px-3 py-2 text-sm text-black hover:bg-gray-40/5',
                {
                  'bg-gray-40/10': keywords.includes(keyword),
                },
              )}
              onClick={() => onClickKeyword(keyword)}
              disabled={disabled}
            >
              {keyword}

              <Icon
                name={keywords.includes(keyword) ? 'cross' : 'plus'}
                color="currentColor"
                width="0.75rem"
                height="0.75rem"
              />
            </button>
          </li>
        ))}
      </ul>
    </Fieldset>
  );
}
