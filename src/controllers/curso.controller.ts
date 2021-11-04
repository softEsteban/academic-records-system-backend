import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Curso} from '../models';
import {CursoRepository} from '../repositories';

export class CursoController {
  constructor(
    @repository(CursoRepository)
    public cursoRepository : CursoRepository,
  ) {}

  @post('/cursos')
  @response(200, {
    description: 'Curso model instance',
    content: {'application/json': {schema: getModelSchemaRef(Curso)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {
            title: 'NewCurso',
            exclude: ['id'],
          }),
        },
      },
    })
    curso: Omit<Curso, 'id'>,
  ): Promise<Curso> {
    return this.cursoRepository.create(curso);
  }

  @get('/cursos/count')
  @response(200, {
    description: 'Curso model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Curso) where?: Where<Curso>,
  ): Promise<Count> {
    return this.cursoRepository.count(where);
  }

  @get('/cursos')
  @response(200, {
    description: 'Array of Curso model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Curso, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Curso) filter?: Filter<Curso>,
  ): Promise<Curso[]> {
    return this.cursoRepository.find(filter);
  }

  @patch('/cursos')
  @response(200, {
    description: 'Curso PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {partial: true}),
        },
      },
    })
    curso: Curso,
    @param.where(Curso) where?: Where<Curso>,
  ): Promise<Count> {
    return this.cursoRepository.updateAll(curso, where);
  }

  @get('/cursos/{id}')
  @response(200, {
    description: 'Curso model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Curso, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Curso, {exclude: 'where'}) filter?: FilterExcludingWhere<Curso>
  ): Promise<Curso> {
    return this.cursoRepository.findById(id, filter);
  }

  @patch('/cursos/{id}')
  @response(204, {
    description: 'Curso PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {partial: true}),
        },
      },
    })
    curso: Curso,
  ): Promise<void> {
    await this.cursoRepository.updateById(id, curso);
  }

  @put('/cursos/{id}')
  @response(204, {
    description: 'Curso PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() curso: Curso,
  ): Promise<void> {
    await this.cursoRepository.replaceById(id, curso);
  }

  @del('/cursos/{id}')
  @response(204, {
    description: 'Curso DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cursoRepository.deleteById(id);
  }
}
