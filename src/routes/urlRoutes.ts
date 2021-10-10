import { Router } from 'express';
import UrlController from '../controller/urlController';

const urlRoutes = Router();

urlRoutes.get('/urls', UrlController.findAll);

urlRoutes.get('/urls/:hash', UrlController.findByHash);

urlRoutes.post('/shorten', UrlController.shorten);

urlRoutes.get('/:hash', UrlController.redirect);

export { urlRoutes };
