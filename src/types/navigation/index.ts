interface INavigation {
  navigate: (page?: string, params?: object) => void;
  goBack: (str?: string) => void;
  openDrawer: () => void;
}
export type {INavigation};
