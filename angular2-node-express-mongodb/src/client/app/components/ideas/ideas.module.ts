import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '../common/common.module';

import { IdeaCreationPageComponent } from './idea-creation-page.component';
import { IdeaEditPageComponent } from './idea-edit-page.component';
import { IdeaListPageComponent } from './idea-list-page.component';
import { IdeaViewPageComponent } from './idea-view-page.component';
import { CommentsSectionComponent } from './comments-section.component';
import { IdeaDetailsComponent } from './idea-details.component';
import { IdeaFormComponent } from './idea-form.component';
import { ProposersSectionComponent } from './proposers-section.component';
import { SkillsSectionComponent } from './skills-section.component';
import { TagsSectionComponent } from './tags-section.component';
import { TechnologiesSectionComponent } from './technologies-section.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DirectivesModule,
        PipesModule,
        CommonModule
    ],
    declarations: [
        IdeaCreationPageComponent,
        IdeaEditPageComponent,
        IdeaListPageComponent,
        IdeaViewPageComponent,
        CommentsSectionComponent,
        IdeaDetailsComponent,
        IdeaFormComponent,
        ProposersSectionComponent,
        SkillsSectionComponent,
        TagsSectionComponent,
        TechnologiesSectionComponent
    ],
    exports: [
        CommentsSectionComponent,
        IdeaDetailsComponent,
        IdeaFormComponent,
        ProposersSectionComponent,
        SkillsSectionComponent,
        TagsSectionComponent,
        TechnologiesSectionComponent
    ],
    providers: []
})
export class IdeasModule { }
