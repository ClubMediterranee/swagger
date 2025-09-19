export interface NavLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface NavSection extends NavLink {
  links: NavLink[];
}

export interface NavColumn {
  sections: NavSection[];
}

export interface NavItem extends NavLink {
  columns: NavColumn[];
}
