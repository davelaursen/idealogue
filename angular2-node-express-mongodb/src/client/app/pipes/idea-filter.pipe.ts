import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
    name: 'idIdeaFilter',
    pure: false
})
@Injectable()
export class IdeaFilterPipe implements PipeTransform {
    transform(ideas: any[], filter: string): any[] {
        return ideas.filter(idea => {
            return idea.name.toLowerCase().indexOf(filter) >= 0 ||
                idea.summary.toLowerCase().indexOf(filter) >= 0;
        });
    }
}
