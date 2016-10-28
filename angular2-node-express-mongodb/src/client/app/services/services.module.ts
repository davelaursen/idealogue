import '../rxjs-extensions';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BlocksModule } from '../blocks/blocks.module';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { IdeaService } from './idea.service';
import { SkillService } from './skill.service';
import { TagService } from './tag.service';
import { TechnologyService } from './technology.service';
import { UserService } from './user.service';

@NgModule({
    imports: [
        HttpModule,
        BlocksModule
    ],
    declarations: [],
    providers: [
        AuthGuard,
        AuthService,
        IdeaService,
        SkillService,
        TagService,
        TechnologyService,
        UserService
    ]
})
export class ServicesModule { }
