# ng4-group-multiselect

## Installation

To install this library, run:

```bash
$ npm install ng4-group-multiselect --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng4-group-multiselect
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { Ng4GroupMultiSelect } from 'ng4-group-multiselect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:
```
<group-multi-select [data]="demo2" [displayKey]="'name'" [groupBy]="'type'" [(ngModel)]="selectedItems" ></group-multi-select>

this.demo2 = [{ id: 1, name: "item 1", type: "group1" }, 
            { id: 2, name: "item 2", type: "group1" }, 
            { id: 3, name: "item 3", type: "group2" }, 
            { id: 4, name: "item 4", type: "group3" }
        ];
   ```     
# Display Name - Required
This is the property of your objects that you want to use to display in the selected values list, as well as in the list of available options. The value can be whatever you want, as long as it's a key value in your objects - this should be a string.

In your template:
```
<group-multi-select [data]="demo2" [displayKey]="'itemName"...></group-multi-select>
In your class:

this.demo2 = [{id: 1, itemName: 'item 1'}, 
    {id: 2, itemName: 'item 2'}, 
    {id: 3, itemName: 'item 3'}, 
    {id: 4, itemName: 'item 4'}
];
```
# Group By - optional
Default - none
This is the property that you'd like to group your items by.

Example

In your template:
```
<group-multi-select [data]="demo2" [displayKey]="'name" [groupBy]="'type'"...></group-multi-select>
In your class:

this.demo2 = [{ id: 1, name: "item 1", type: "type1" }, 
    { id: 2, name: "item 2", type: "type1" }, 
    { id: 3, name: "item 3", type: "type1" }, 
    { id: 4, name: "item 4", type: "type2" }
];
```


## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [ovesh.parasara](mailto:ovesh.parasara@gmail.com)
