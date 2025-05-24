import { AbstractRepository } from '@app/common';
import { Logger } from '@nestjs/common';
import { Reservation } from './entity/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectRepository(Reservation)
    reservationsRepository: Repository<Reservation>,
    entityManager: EntityManager,
  ) {
    super(reservationsRepository, entityManager);
  }
}
