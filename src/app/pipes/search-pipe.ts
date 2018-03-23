import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, selectedCategory: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        if (!selectedCategory) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
            return item[selectedCategory].toString().toLowerCase().includes(searchText);
        });
    }
}