import { BadRequestException, Delete, Get, Injectable, NotFoundException, Param } from "@nestjs/common";
import { MongoRepository, ObjectID, ObjectIdColumn, Repository } from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import {EUser} from '../entities/euser';
import {DateTime} from "luxon";
import { GlobalsService } from "../services/globals.service";
import { ICrud } from "../interfaces/icrud";
import { MongoHelper } from "../helpers/MongoHelper";

@Injectable()
export class UsersService implements ICrud{

  constructor(@InjectRepository(EUser) private readonly userRepository: MongoRepository<EUser>,private globalsService: GlobalsService) {
  }

  async getAll(pageNumber: number = 0, listCount: number = 50, orderBy:Object= {name: 'ASC'}): Promise<EUser[]> {
    let list= await this.userRepository.find({
      order: orderBy,
      take: Math.floor(listCount),
      skip: pageNumber * listCount
    });
    return list;
  }

  async authenticate(email: string, password: string): Promise<EUser | null> {
    let eUser = await this.userRepository.findOne({email: email.toLowerCase(), password: password, enabled: true});
    if (eUser) {
      eUser.password = '';
      return eUser;
    }
    else return null;
  }

  async getByID(id: string): Promise<EUser | undefined> {
    return await this.userRepository.findOne(id);
  }

  async save(eUser: EUser): Promise<string | undefined> {
    if (!eUser.id) eUser.dateInserted = DateTime.utc().toISO()
    let e = await this.userRepository.save(eUser);
    if (e.id) return e.id.toHexString();
  }

  async update(id:string, eUser:EUser): Promise<boolean>{
    const exists = MongoHelper.isValidObjectID(id) && await this.userRepository.findOne(id);
    if (!exists) throw new NotFoundException();
    let resp=await this.userRepository.update(id, eUser);
    return resp.affected > 0;
  }

  async insert(eUser: EUser): Promise<string | undefined> {
    if (!eUser || !eUser.name || !eUser.email) {
      throw new BadRequestException(`User must have at least name and email defined`);
    }
    eUser.email=eUser.email.toLowerCase();
    if(await this.userRepository.count({email:eUser.email}))return 'email exists';
    if (!eUser.id) eUser.dateInserted = DateTime.utc().toFormat(this.globalsService.isoFormat)
    let savedUser = await this.userRepository.save(eUser);
    if (savedUser.id) return savedUser.id.toHexString();
  }

  async remove(id: string): Promise<boolean> {
    const exists = MongoHelper.isValidObjectID(id) && await this.userRepository.findOne(id);
    if (!exists) throw new NotFoundException();
    let result = await this.userRepository.delete({id: ObjectID.createFromHexString(id)});
    return true;
  }

  async clear(): Promise<void> {
    await this.userRepository.clear();
  }
}
