import type { Table } from "antd";

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

export type EditableTableProps = Parameters<typeof Table>[0];

export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export interface DataType {
  key: React.Key;
  source: string;
  usagePerYear: number;
  percentage: number;
  CarbonTonsPerYear: number;
}

export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
