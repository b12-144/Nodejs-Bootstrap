import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Test } from "@nestjs/testing";
import { EUser } from "../entities/euser";
import { GlobalsService } from "../services/globals.service";
import { MongoRepository } from "typeorm";
import {  TypeOrmModule } from "@nestjs/typeorm";
import { INestApplication } from "@nestjs/common";
import * as supertest from 'supertest';
import { Defines } from "../codes/defines";

describe('NonMockedUsersController', () => {
  let app: INestApplication;
  let repository: MongoRepository<EUser>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forFeature([EUser,]),
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url:'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
          database: 'node_bootstrap',
          entities: Defines.entities,
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService,GlobalsService],
    }).compile();
    app = module.createNestApplication();
    repository = module.get('EUserRepository');
    await app.init();
  });

  afterAll(async () => {
    await repository.deleteOne({name:'Bozo'});
    await app.close();
  });

  describe('getAll for real', () => {
    it('should return an array of users', async () => {
      await repository.save([{ name: 'Bozo' }]);
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({name: 'Bozo'}),
        ])
      );
    });
  });

});
