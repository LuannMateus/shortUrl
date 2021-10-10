import { prop, Typegoose } from '@hasezoey/typegoose';

class Url extends Typegoose {
  @prop({ required: true })
  public hash!: string;

  @prop({ required: true })
  public originUrl!: string;

  @prop({ required: true })
  public shortUrl!: string;
}

export const urlRepository = new Url().getModelForClass(Url);
