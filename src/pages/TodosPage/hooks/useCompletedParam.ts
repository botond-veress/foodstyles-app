import React from 'react';
import { useSearchParams } from 'react-router-dom';

// This can be refactored so it will be more generic with serializers.
export const useCompletedQueryParam = () => {
  const [params, setParams] = useSearchParams();

  const value = React.useMemo(() => {
    const value = params.get('completed');

    if (value == 'true') return true;
    if (value == 'false') return false;

    return undefined;
  }, [params]);

  const update = React.useCallback(
    (value?: boolean) => {
      const completed = value?.toString();

      if (completed != undefined) params.set('completed', completed);
      else params.delete('completed');

      setParams(params);
    },
    [params, setParams]
  );

  return [value, update] as const;
};
