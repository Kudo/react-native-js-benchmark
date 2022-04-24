export interface ChartData {
  testGroups: string[];
  dataSet: ChartDataGroupSet[];
  comment?: string;
}

export interface ChartDataGroupSet {
  jsEngine: string;
  groupData: string[] | number[];
}
