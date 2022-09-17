import {
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Request,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private webhooksService: WebhooksService) {}
  @Post('stripe')
  async callStripe(
    @Headers('stripe-signature') sig: string,
    @Request() req: RawBodyRequest<Request>,
  ): Promise<void> {
    await this.webhooksService.emitStipeEvent(req.rawBody, sig);
  }
}
