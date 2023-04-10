import { Router } from 'express';
import {
  importSprockets,
  getSprockets,
  saveSprocket,
} from '../controllers/sprocket.controller';

export default (router: Router) => {
  router.post('/import-sprockets', importSprockets);
  router.get('/sprocket', getSprockets); //by criteria
  router.get('/sprocket/:id', getSprockets);
  router.post('/sprocket', saveSprocket);
  router.put('/sprocket', saveSprocket);
};
