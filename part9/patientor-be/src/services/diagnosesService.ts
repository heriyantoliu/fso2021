import diagnoses from '../../data/diagnoses';

import { NonLatinDiagnoseEntry, DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const getNonLatinEntries = (): NonLatinDiagnoseEntry[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name,
  }));
};

export default { getEntries, getNonLatinEntries };
