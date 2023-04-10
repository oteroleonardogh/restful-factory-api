import { Router } from 'express';
import {
  importFactories,
  getFactories,
} from '../controllers/factory.controller';

export default (router: Router) => {
  router.post('/import-factories', importFactories);
  router.get('/factory', getFactories);
  router.get('/factory/:id', getFactories);
};
