import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Test } from "@nestjs/testing";
import { EUser } from "../entities/euser";
import { GlobalsService } from "../services/globals.service";
import { MongoRepository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let repository: MongoRepository<EUser>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [ GlobalsService, UsersService, {
        provide: getRepositoryToken(EUser),
        useClass: MongoRepository,
      },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('getAll mocked', () => {
    it('should return an array of users', async () => {
      const result:EUser[] = [new EUser({name:'Bruno', email:'bruno@tezine.com'})];
      jest.spyOn(usersService, 'getAll').mockImplementation(async() => result);
      expect(await usersController.getAll()).toBe(result);
    });
  });

});
