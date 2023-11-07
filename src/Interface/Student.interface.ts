import { Document } from 'mongoose';

export interface IStudent extends Document {
  readonly name: string;
  readonly roleNumber: number;
  readonly class: string;
  readonly gender: string;
  readonly marks: number;
}
