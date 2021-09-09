import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./controllers/users.service";
import { GlobalsService } from "./services/globals.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Defines } from "./codes/defines";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
      database: 'node_bootstrap',
      entities: Defines.entities,
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature(Defines.entities),
  ],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [
    AppService,
    UsersService,
    GlobalsService
  ],
})
export class AppModule {}
