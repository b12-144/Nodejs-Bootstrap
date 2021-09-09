//author Bruno Tezine
import {  Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import {GlobalsService} from '../services/globals.service';
import {EUser} from '../entities/euser';
import { UsersService } from "./users.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private globalsService: GlobalsService, private readonly usersService: UsersService) {
  }

  @Get()
  @ApiOkResponse({ description: 'Returns all users', type: EUser, isArray:true })
  async getAll(@Query('pageNumber') pageNumber: number = 0, @Query('listCount') listCount: number = 50, @Query('orderBy') orderBy: Object = {name: 'ASC'}): Promise<EUser[]> {
    return await this.usersService.getAll(pageNumber, listCount, orderBy);
  }

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<EUser | undefined> {
    return await this.usersService.getByID(id);
  }

  @Get('authenticate/:email/:password')
  async authenticate(@Param('email') email: string, @Param('password') password: string): Promise<EUser | null> {
    return await this.usersService.authenticate(email, password);
  }

  @Post('save')
  async save(@Body() eUser: Partial<EUser>): Promise<string | undefined> {
    return await this.usersService.save(new EUser(eUser));
  }

  @Put(':id')
  async update(@Param('id') id, @Body() eUser: Partial<EUser>): Promise<boolean> {
    return await this.usersService.update(id, new EUser(eUser));
  }

  @Post()
  async insert(@Body() eUser: Partial<EUser>): Promise<string | undefined> {
    return await this.usersService.insert(new EUser(eUser));
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.usersService.remove(id);
  }
}
