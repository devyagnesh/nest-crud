import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Student {
  @Prop()
  name: string;
  @Prop()
  roleNumber: number;
  @Prop()
  class: string;
  @Prop()
  gender: string;
  @Prop()
  marks: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
