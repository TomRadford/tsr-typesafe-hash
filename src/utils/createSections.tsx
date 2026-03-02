type SectionMap = Record<string, React.ComponentType>;

/**
 * Simple factory for generating typesafe hash nav in TanStack Router
 */
export function createSections<T extends SectionMap>(
  prefix: string,
  components: T,
) {
  const keys = Object.keys(components) as [
    keyof T & string,
    ...(keyof T & string)[],
  ];

  const getSectionId = (key: keyof T & string) => `${prefix}-${key}`;

  function SectionList() {
    return keys.map((key) => {
      const Component: React.ComponentType = components[key];
      return (
        <div key={key} id={getSectionId(key)}>
          <Component />
        </div>
      );
    });
  }

  return { keys, getSectionId, SectionList };
}
