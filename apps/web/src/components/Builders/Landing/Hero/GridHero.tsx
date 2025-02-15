import { GridItem } from 'apps/web/src/components/Builders/Landing/Hero/GridItem';

type GridHeroExportProps = {
  columns?: number;
  hasBlue?: boolean;
};

export function GridHero({ columns = 20, hasBlue = false }: GridHeroExportProps) {
  const gridItems = Array(columns ** 2).fill(null);

  return (
    <div className="relative flex h-full w-full justify-center overflow-hidden bg-dark-palette-backgroundAlternate">
      <div
        className="grid aspect-square min-h-[1400px] w-full min-w-[1280px] gap-px p-px"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {gridItems.map((_, i) => (
          <GridItem hasBlue={hasBlue} key={i} />
        ))}
      </div>
    </div>
  );
}
