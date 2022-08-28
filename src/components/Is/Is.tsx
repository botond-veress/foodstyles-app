import React from 'react';

export type IsElement = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

export type IsProps<T extends IsElement> = Omit<React.ComponentProps<T>, 'is'> & {
  is: T;
};

function IsComponent<T extends IsElement>({ is: Component, ...rest }: IsProps<T>, ref: React.Ref<any>) {
  // @ts-ignore
  return <Component {...{ ref }} {...rest} />;
}

export const Is = React.forwardRef(IsComponent);
