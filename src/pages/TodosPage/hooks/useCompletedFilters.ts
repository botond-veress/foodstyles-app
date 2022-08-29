import React from 'react';

const filters = [
  [undefined, 'All'],
  [true, 'Completed'],
  [false, 'Incomplete']
] as const;

export const useCompletedFilters = (completed: boolean | undefined, onUpdate: (completed?: boolean) => void) => {
  return React.useMemo(() => {
    return filters.map(([value, name]) => ({
      value,
      name,
      active: value === completed,
      update: () => onUpdate(value)
    }));
  }, [completed, onUpdate]);
};
