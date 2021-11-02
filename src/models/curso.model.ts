import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Estudiante} from './estudiante.model';
import {Profesor} from './profesor.model';

@model()
export class Curso extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  periodo: string;

  @property({
    type: 'number',
    required: true,
  })
  notaFinal: string;

  @belongsTo(() => Profesor)
  profesorId: string;

  @property({
    type: 'string',
  })
  estudianteId?: string;

  @hasMany(() => Estudiante)
  estudiantes: Estudiante[];

  constructor(data?: Partial<Curso>) {
    super(data);
  }
}

export interface CursoRelations {
  // describe navigational properties here
}

export type CursoWithRelations = Curso & CursoRelations;
