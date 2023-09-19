import { memo, ReactNode } from 'react';

type Props = {
  head: string[];
  rows: ReactNode;
};

export const Table = memo(function Table({ head, rows }: Props) {
  return (
    <table className="w-full border-separate border-spacing-y-8 pl-4">
      <thead>
        <tr className="hidden md:table-row">
          {head.map((columnName, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <td key={i} className="font-semibold text-cds-background-gray-60">
              {columnName}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
});
