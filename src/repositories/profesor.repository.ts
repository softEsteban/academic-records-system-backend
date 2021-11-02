import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Profesor, ProfesorRelations, Curso} from '../models';
import {CursoRepository} from './curso.repository';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.id,
  ProfesorRelations
> {

  public readonly cursos: HasManyRepositoryFactory<Curso, typeof Profesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CursoRepository') protected cursoRepositoryGetter: Getter<CursoRepository>,
  ) {
    super(Profesor, dataSource);
    this.cursos = this.createHasManyRepositoryFactoryFor('cursos', cursoRepositoryGetter,);
    this.registerInclusionResolver('cursos', this.cursos.inclusionResolver);
  }
}
