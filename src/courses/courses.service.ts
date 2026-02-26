import { Injectable } from '@nestjs/common';
import { CreateCourseDto, GetCoursesDto, UpdateCourseDto } from '@contracts/academic/courses.dto';

// In-memory store for POC purposes
const coursesStore: any[] = [];
let nextId = 1;

@Injectable()
export class CoursesService {
  findAll(query: GetCoursesDto) {
    let results = [...coursesStore];

    if (query.level) {
      results = results.filter((c) => c.level === query.level);
    }

    if (query.search) {
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(query.search.toLowerCase()) ||
          c.code.toLowerCase().includes(query.search.toLowerCase()),
      );
    }

    if (query.isActive !== undefined) {
      results = results.filter((c) => c.isActive === query.isActive);
    }

    const skip = query.skip ?? 0;
    const limit = query.limit ?? 10;

    return {
      data: results.slice(skip, skip + limit),
      total: results.length,
    };
  }

  findById(id: string) {
    const course = coursesStore.find((c) => c.id === parseInt(id));
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  }

  create(dto: CreateCourseDto) {
    const course = {
      id: nextId++,
      ...dto,
      isActive: dto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    coursesStore.push(course);
    return course;
  }

  update(id: string, dto: UpdateCourseDto) {
    const index = coursesStore.findIndex((c) => c.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Course with id ${id} not found`);
    }
    coursesStore[index] = {
      ...coursesStore[index],
      ...dto,
      updatedAt: new Date(),
    };
    return coursesStore[index];
  }

  delete(id: string) {
    const index = coursesStore.findIndex((c) => c.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Course with id ${id} not found`);
    }
    coursesStore.splice(index, 1);
    return { message: `Course ${id} deleted successfully` };
  }
}
