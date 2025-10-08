import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScriptModule } from './script/script.module';
import { ScriptService } from './script/script.service';
import { RealtimeGateway } from './realtime.gateway';
import { ScriptController } from './script/script.controller';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [ScriptModule],
  controllers: [AppController, ScriptController, ScheduleController],
  providers: [AppService, ScriptService, RealtimeGateway],
})
export class AppModule {}
