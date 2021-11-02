import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Profesor,
  Curso,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorCursoController {
  constructor(
    @repository(ProfesorRepository) protected profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/cursos', {
    responses: {
      '200': {
        description: 'Array of Profesor has many Curso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Curso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Curso>,
  ): Promise<Curso[]> {
    return this.profesorRepository.cursos(id).find(filter);
  }

  @post('/profesors/{id}/cursos', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Curso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {
            title: 'NewCursoInProfesor',
            exclude: ['id'],
            optional: ['profesorId']
          }),
        },
      },
    }) curso: Omit<Curso, 'id'>,
  ): Promise<Curso> {
    return this.profesorRepository.cursos(id).create(curso);
  }

  @patch('/profesors/{id}/cursos', {
    responses: {
      '200': {
        description: 'Profesor.Curso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {partial: true}),
        },
      },
    })
    curso: Partial<Curso>,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.profesorRepository.cursos(id).patch(curso, where);
  }

  @del('/profesors/{id}/cursos', {
    responses: {
      '200': {
        description: 'Profesor.Curso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.profesorRepository.cursos(id).delete(where);
  }
}
