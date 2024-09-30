import { Module,Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/*Módulo Database que permite establecer la conexión a la Base de datos */
@Global()
@Module({
  imports:[ MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGO_URI,
        };
      },
    }),
  ], 
  exports: [MongooseModule],
})
export class DatabaseModule {}