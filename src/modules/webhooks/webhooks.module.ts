import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebHookController } from '../webhooks/controllers/webhook.controller';
import { WebHookServices } from '../webhooks/services/webhook.service';

@Module({

  imports:[HttpModule],
  controllers: [WebHookController],
  providers: [WebHookServices],
  exports : [WebHookServices]
})
export class WebHooksModule {}