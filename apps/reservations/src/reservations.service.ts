import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PAYMENT_SERVICE_NAME, PaymentServiceClient, User } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { PrismaService } from './prisma.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentServiceClient;

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(PAYMENT_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService =
      this.client.getService<PaymentServiceClient>(PAYMENT_SERVICE_NAME);
  }

  async create(
    createReservationDto: CreateReservationDto,
    { email, id: userId }: User,
  ) {
    return this.paymentsService
      .createCharge({
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map(async ({ id }) => {
          return this.prismaService.reservation.create({
            data: {
              startDate: createReservationDto.startDate,
              endDate: createReservationDto.endDate,
              timestamp: new Date(),
              userId,
              invoiceId: id,
            },
          });
        }),
      );
  }

  async findAll() {
    return this.prismaService.reservation.findMany({});
  }

  async findOne(id: number) {
    return this.prismaService.reservation.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prismaService.reservation.update({
      where: { id },
      data: updateReservationDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.reservation.delete({ where: { id } });
  }
}
