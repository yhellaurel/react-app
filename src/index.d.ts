export type ColumnDetails = {
  title: string;
  dataIndex: string;
  hidden?: boolean;
};

export type Operation = {
  render: () => React.ReactNode;
};

export interface SelectedDataObject {
  active: boolean;
  category: string;
  description: string;
  id: string;
  name: string;
}

export interface CategoriesObject {
  id: string;
  name: string;
}

export type TableItemActions = {
  render: (values: SelectedDataObject) => React.ReactNode;
};

export interface BulkDeleteObject {
  itemsToDelete: string[];
}
