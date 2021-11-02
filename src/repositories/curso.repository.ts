import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Curso, CursoRelations, Profesor, Estudiante} from '../models';
import {ProfesorRepository} from './profesor.repository';
import {EstudianteRepository} from './estudiante.repository';

export class CursoRepository extends DefaultCrudRepository<
  Curso,
  typeof Curso.prototype.id,
  CursoRelations
> {

  public readonly profesor: BelongsToAccessor<Profesor, typeof Curso.prototype.id>;

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Curso.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Curso, dataSource);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
    this.profesor = this.createBelongsToAccessorFor('profesor', profesorRepositoryGetter,);
    this.registerInclusionResolver('profesor', this.profesor.inclusionResolver);
  }
}
