export interface MigrationNote {
  id: string;
  number: number;
  title: string;
  published_at: string;
  updated_at: string;
  content: string;
  category: string;
  route: {
    path: string;
    method: string;
    deprecated: boolean;
    discussion_id: string;
    replacement_route: string;
    deletion_date: string;
    id: string;
  };
}
