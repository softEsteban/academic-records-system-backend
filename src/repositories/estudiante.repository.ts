import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Curso} from '../models';
import {CursoRepository} from './curso.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly cursos: HasManyRepositoryFactory<Curso, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CursoRepository') protected cursoRepositoryGetter: Getter<CursoRepository>,
  ) {
    super(Estudiante, dataSource);
    this.cursos = this.createHasManyRepositoryFactoryFor('cursos', cursoRepositoryGetter,);
    this.registerInclusionResolver('cursos', this.cursos.inclusionResolver);
  }
}
