import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateReservationDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
