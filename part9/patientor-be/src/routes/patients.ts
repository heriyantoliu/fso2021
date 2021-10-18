/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSSNEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addEntry = patientService.AddPatient(newPatientEntry);
    res.json(addEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
