import {
  Controller,
  Put,
  Post,
  Get,
  HttpStatus,
  Body,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const newStudent =
        await this.studentService.createStudent(createStudentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'new student has been created !',
        student: newStudent,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'ERROR : student not created',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'student has been updated successfully',
        student: existingStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get()
  async getStudents(@Res() response) {
    try {
      const students = await this.studentService.getAllStudent();
      return response.status(HttpStatus.OK).json({
        message: 'fetched all the students',
        students,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const student = await this.studentService.getStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'fetched student',
        student,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentID: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentID);
      return response.status(HttpStatus.OK).json({
        message: 'student has been deleted',
        deletedStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
