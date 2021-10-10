import { NextFunction, Request, Response } from 'express';
import shortid from 'shortid';
import config from '../config/config';
import { IUrl } from '../infra/database/model/Url';
import { urlRepository } from '../infra/database/repositories/urlRepository';

class UrlController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    const urls = await urlRepository.find({});

    return res.status(200).json(urls);
  }

  public async findByHash(req: Request, res: Response, next: NextFunction) {
    const { hash } = req.params;

    const url = await urlRepository.findOne({ hash });

    if (!url) {
      return res.status(404).json({
        message: 'Url does not exist!',
      });
    }

    return res.status(200).json(url);
  }

  public async shorten(req: Request, res: Response, next: NextFunction) {
    const { originUrl } = req.body;

    const url = await urlRepository.findOne({ originUrl });

    if (url) {
      return res.status(200).json({
        shortUrl: url,
      });
    }

    const hash = shortid.generate();

    const shortUrl = `${config.API_URL}/api/v1/${hash}`;

    const createdShortUrl = await urlRepository.create({
      originUrl,
      hash,
      shortUrl,
    });

    return res.status(200).json(createdShortUrl);
  }

  public async redirect(req: Request, res: Response, next: NextFunction) {
    const { hash } = req.params;

    const shortUrl = (await urlRepository.findOne({ hash })) as IUrl;

    if (!shortUrl) {
      return res.status(404).json({
        message: 'Url does not exist!',
      });
    }

    return res.redirect(shortUrl?.originUrl);
  }
}

export default new UrlController();
