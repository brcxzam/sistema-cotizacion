import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { PlazosModule } from './plazos/plazos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cdt-test:probandocdt@cluster0.touto.mongodb.net/sistemaCotizacion?retryWrites=true&w=majority',
      // 'mongodb://localhost:27017/sistemaCotizacion',
    ),
    ProductosModule,
    PlazosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
