import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UserModule } from 'user/user.module';
import { MiddlewareGuard } from 'middleware/middleware.guard';
import { PlantModule } from 'plant/plant.module';

@Module({
  imports: [UserModule, PlantModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useExisting: true,
      useClass: MiddlewareGuard,
    },
  ],
})
export class AppModule {}
