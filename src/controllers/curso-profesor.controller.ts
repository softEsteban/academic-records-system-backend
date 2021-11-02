import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Curso,
  Profesor,
} from '../models';
import {CursoRepository} from '../repositories';

export class CursoProfesorController {
  constructor(
    @repository(CursoRepository)
    public cursoRepository: CursoRepository,
  ) { }

  @get('/cursos/{id}/profesor', {
    responses: {
      '200': {
        description: 'Profesor belonging to Curso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesor)},
          },
        },
      },
    },
  })
  async getProfesor(
    @param.path.string('id') id: typeof Curso.prototype.id,
  ): Promise<Profesor> {
    return this.cursoRepository.profesor(id);
  }
}
