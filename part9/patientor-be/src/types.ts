export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;
