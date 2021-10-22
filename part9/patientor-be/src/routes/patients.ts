/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';
import patients from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientDetail(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const findPatient = patients.find((p) => p.id === req.params.id);
    if (!findPatient) {
      res.sendStatus(404);
      return;
    }
    const patient = patientService.AddEntry(findPatient, newEntry);
    res.json(patient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addEntry = patientService.AddPatient(newPatientEntry);
    res.json(addEntry);
  } catch (e) {
    console.log(e);
    res.status(400).send((e as Error).message);
  }
});

export default router;
