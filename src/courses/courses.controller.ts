import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CreateCourseDto, GetCoursesDto } from '@contracts/academic/courses.dto';
import { MessagePattern } from '../shared.config';
import { CoursesService } from './courses.service';

@Controller()
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  /**
   * GET /courses
   * Pattern: { service: 'academic', cmd: 'courses', action: 'find-all' }
   */
  @MessagePattern({ cmd: 'courses', action: 'find-all' })
  findAll(@Payload() data: { query: GetCoursesDto }) {
    return this.service.findAll(data.query);
  }

  /**
   * POST /courses
   * Pattern: { service: 'academic', cmd: 'courses', action: 'create' }
   */
  @MessagePattern({ cmd: 'courses', action: 'create' })
  create(@Payload() data: { body: CreateCourseDto }) {
    return this.service.create(data.body);
  }
}
