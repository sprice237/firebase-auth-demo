import type { ReactElement, ReactNode, ValidationMap, WeakValidationMap } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CmpReturn = ReactElement<any, any> | null;

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Cmp<TProps = {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: TProps, context?: any): CmpReturn;
  propTypes?: WeakValidationMap<TProps> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<TProps> | undefined;
  displayName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type CmpWithChildren<TProps = {}> = Cmp<TProps & { children?: ReactNode | undefined }>;

// eslint-disable-next-line @typescript-eslint/ban-types
export interface RouteCmp<TProps = {}> extends Cmp<TProps> {
  path: string;
  routes: JSX.Element[];
  allowAuthenticated?: boolean;
  allowUnauthenticated?: boolean;
}

export const hello = 'hello';
