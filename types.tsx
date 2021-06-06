/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Log: undefined;
  Notes: undefined;
  Tasks: {
    type: "task"
  };
  Events: undefined;
};

export type LogParamList = {
  LogScreen: undefined;
  NotesScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
