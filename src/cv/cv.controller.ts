import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth-guard';
import express from 'express';
import { UserRoleEnum } from 'src/enums/user-role.enum';
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCvDto: CreateCvDto, 
         @Req() request: express.Request) {
    
    return this.cvService.create(createCvDto, request.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllCvs(@Req() request: express.Request) {
    const user = request.user;
    if(user)
      return this.cvService.getAllCvs(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, 
          @Req() request: express.Request) {
            const user = request.user;
            if(user)
              return this.cvService.findById(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.cvService.remove(id);
  }
}
