import express from 'express';

import {
    postProb,
    getAllProb,
    getProb,
    deleteProb,
    postMachine
} from '../../controller/ProbFunction.js';

const ProbRoutes = express.Router();

ProbRoutes.get("/", getAllProb);

ProbRoutes.post("/post-prob", postProb);
ProbRoutes.get("/get-prob/:numericId", getProb);
ProbRoutes.delete("/delete-prob/:numericId", deleteProb);

ProbRoutes.post("/post-mac", postMachine);

export default ProbRoutes;