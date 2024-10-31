import {
  NavigationContainerRefWithCurrent,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import React from 'react';

export const navigationRef: React.RefObject<
  NavigationContainerRefWithCurrent<ParamListBase>
> = React.createRef();

/**
 * navigation handler
 * @param name --screen name where to navigate
 * @param params
 */

export const navigate = (name: string, params?: object): void => {
  navigationRef.current?.navigate(name, params);
};

/**
 * Navigate to Another Stack Screen
 * @param stackName Name of the Stack to which we need to Navigate
 * @param screenName Name of screen inside of that stack
 * @param params params to be passed to another screen
 */

export const navigateToAnotherStack = (
  stackName: string,
  screenName: string,
  params?: object,
): void => {
  navigationRef.current?.navigate(stackName, {
    screenName: screenName,
    params,
  });
};

/**
 * go back to previous screen
 */
export const goBack = (): void => {
  navigationRef?.current?.goBack();
};

export const replace = (routeName: string) => {
  navigationRef.current?.dispatch(StackActions.replace(routeName));
};
