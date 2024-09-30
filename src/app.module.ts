import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { WebHooksModule } from './modules/webhooks/webhooks.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports:
  [
    /*Permite importar las variables de entorno*/
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true, // Permite que el módulo ConfigModule esté disponible en toda la aplicación
    }),
    DatabaseModule,
    WebHooksModule,
    MoviesModule
  ],
})
export class AppModule {}
