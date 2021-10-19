/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientDetail(req.params.id);
  if (patient) {
    console.log(patient);
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
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
