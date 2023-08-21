import { RouteObject } from 'react-router-dom';

export interface RoutesObject {
  path: string;
  element: JSX.Element;
  children?: RouteObject[];
}

export interface ExtendedRouteObject extends RoutesObject {
  guard?: (route: ExtendedRouteObject) => Promise<boolean> | boolean;
}
