import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from 'src/Interface/Student.interface';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = new this.studentModel(createStudentDto);
    return await newStudent.save();
  }

  async updateStudent(
    studentID: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(
      studentID,
      updateStudentDto,
      { new: true },
    );

    if (!existingStudent) {
      throw new NotFoundException(`student not found with id : ${studentID}`);
    }
    return existingStudent;
  }

  async getAllStudent(): Promise<IStudent[]> {
    const students = await this.studentModel.find();

    if (!students || students.length < 1) {
      throw new NotFoundException('no students found !');
    }

    return students;
  }

  async getStudent(studentID: string): Promise<IStudent> {
    const studentById = await this.studentModel.findById(studentID).exec();

    if (!studentById) {
      throw new NotFoundException(`student not found with id of ${studentID}`);
    }

    return studentById;
  }

  async deleteStudent(studentID: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel
      .findByIdAndDelete(studentID)
      .exec();

    if (!deletedStudent) {
      throw new NotFoundException(
        `student that you want delete with id ${studentID} not found`,
      );
    }

    return deletedStudent;
  }
}
