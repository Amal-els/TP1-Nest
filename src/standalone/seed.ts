import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { CvService } from 'src/cv/cv.service';
import { SkillService } from 'src/skill/skill.service';
import { randEmail, randFilePath, randJobTitle, randLastName, randNumber, randPassword, randSkill, randUserName } from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {

    const usersArray: any[] = [];
    for (let i = 0; i < 10; i++) {
      usersArray.push({
        username: randUserName(),
        email: randEmail({ provider: 'gmail' }),
        password: randPassword({ length: 10 })[0],
        
      });
    }

    const skillsArray: any[] = [];
    for (let i = 0; i < 10; i++) {
      skillsArray.push({
        designation: randSkill(),
      });
    }

    const cvsArray: any[] = [];
    for (let i = 0; i < 10; i++) {
      cvsArray.push({
        name: randLastName(),
        firstName: randUserName(),
        age: Math.floor(Math.random() * 50) + 20,
        cin: randNumber({ length: 8 })[0],
        job: randJobTitle(),
        path: randFilePath(),
        user: null, 
        skills: [], 
      });


    }

    const userService = app.get(UserService);
    const savedUsers: any[] = [];
    for (const user of usersArray) {
      const createdUser = await userService.create(user);
      savedUsers.push(createdUser[0]); // create returns an array
    }
    console.log('Users seeded');

    const skillService = app.get(SkillService);
    const savedSkills: any[] = [];
    for (const skill of skillsArray) {
      const createdSkill = await skillService.create(skill);
      savedSkills.push(createdSkill[0]);
    }
    console.log('Skills seeded');

    const cvService = app.get(CvService);
    for (let i = 0; i < cvsArray.length; i++) {
      const cv = cvsArray[i];
      // assign a random user
      cv.user = savedUsers[Math.floor(Math.random() * savedUsers.length)];
      // assign random 1-3 skills
      cv.skills = savedSkills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
      await cvService.create(cv);
    }
    console.log(' CVs seeded');

  } catch (err) {
    console.error(' Seeding failed:', err);

  } finally {
    await app.close();
    console.log('Nest app closed');
  }
}

bootstrap();