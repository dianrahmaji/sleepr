import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CurrentUser, User } from '@app/common';
import { Reservation } from './entity/reservation.entity';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationService: ReservationsService) {}

  @Mutation(() => Reservation)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser() user: User,
  ) {
    return this.reservationService.create(createReservationInput, user);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  findAll() {
    return this.reservationService.findAll();
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.reservationService.findOne(id);
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', { type: () => Number }) id: number) {
    return this.reservationService.remove(id);
  }
}
