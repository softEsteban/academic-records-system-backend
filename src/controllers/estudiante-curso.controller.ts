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
  Estudiante,
  Curso,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteCursoController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/cursos', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Curso',
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
    return this.estudianteRepository.cursos(id).find(filter);
  }

  @post('/estudiantes/{id}/cursos', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Curso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Curso, {
            title: 'NewCursoInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) curso: Omit<Curso, 'id'>,
  ): Promise<Curso> {
    return this.estudianteRepository.cursos(id).create(curso);
  }

  @patch('/estudiantes/{id}/cursos', {
    responses: {
      '200': {
        description: 'Estudiante.Curso PATCH success count',
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
    return this.estudianteRepository.cursos(id).patch(curso, where);
  }

  @del('/estudiantes/{id}/cursos', {
    responses: {
      '200': {
        description: 'Estudiante.Curso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Curso)) where?: Where<Curso>,
  ): Promise<Count> {
    return this.estudianteRepository.cursos(id).delete(where);
  }
}
