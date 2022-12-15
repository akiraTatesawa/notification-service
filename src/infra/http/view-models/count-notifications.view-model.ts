import { ApiProperty } from '@nestjs/swagger';

export class CountNotificationsViewModel {
  @ApiProperty({
    name: 'recipientId',
    type: String,
    example: '1418e8b0-7bf7-11ed-a1eb-0242ac120002',
    description: 'The recipient id (UUID)',
  })
  recipientId: string;

  @ApiProperty({
    name: 'count',
    type: Number,
    example: 1,
    description: 'The number of notifications a recipient has',
  })
  count: number;
}
