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
  Curso,
  Estudiante,
} from '../models';
import {CursoRepository} from '../repositories';

export class CursoEstudianteController {
  constructor(
    @repository(CursoRepository) protected cursoRepository: CursoRepository,
  ) { }

  @get('/cursos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Curso has many Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante[]> {
    return this.cursoRepository.estudiantes(id).find(filter);
  }

  @post('/cursos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Curso model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Curso.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInCurso',
            exclude: ['id'],
            optional: ['cursoId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.cursoRepository.estudiantes(id).create(estudiante);
  }

  @patch('/cursos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Curso.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.cursoRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/cursos/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Curso.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.cursoRepository.estudiantes(id).delete(where);
  }
}
