import {
  AfterViewChecked, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SampleComponent),
  multi: true
};
export const DROPDOWN_CONTROL_VALIDATION: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SampleComponent),
  multi: true,
}
const noop = () => {
};

let styles = `

  .hyperMSInput {
      border-radius: 4px;
      padding: 8px;
      background: #FFF;
      width: 100%;
  }



  .hyperMSControllerBox, .hyperMSOptionsBox {
      padding: 15px;
      margin: 0;
  }

  .hyperMSControllerBox {
      border-bottom: 1px solid rgba(221, 221, 221, 1);
  }

  .hyperMSGroup h4 {
      margin-right: 10px;
      min-width: 200px;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid #c3c3c3;
  }

  h4.option {
      margin-bottom: 5px;
  }

  .hyperMSGroup:first-of-type>h4 {
      margin-top: 0;
  }

  .option {
      cursor: pointer;
  }

  .option.selected {
      background-color: rgba(214, 214, 214, 1)
  }

  .option.listItem {
      display: inline-block;
      margin-right: 10px;
      min-width: 200px;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid #c3c3c3;
  }


  /*Utility Classes*/

  .hyperMSRight {
      float: right;
  }

  .hyperMSLeft {
      float: left;
  }
   .c-remove {
    position: absolute;
    right: 8px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 10px;
}
 .c-label {
    display: block;
    float: left;
}

.selected-list{
display: flex;
}
.selected-list .c-btn {
    width: 100%;
    box-shadow: 0px 1px 5px #959595;
    padding: 10px;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: inline-flex;
    position: relative;
}

.c-btn {
    display: inline-block;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    color: #333;
}
.ovesh-dropdown {
   position: relative;
}


.selected-list .c-angle-down, .selected-list .c-angle-up {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    pointer-events: none;
}

.selected-list .c-list {
    float: left;
    padding: 0px;
    margin: 0px;
    width: calc(100% - 20px);
}
.arrow-2.arrow-up {
   border-bottom: 15px solid #ccc ;
    top: -2px ;
}

.arrow-up {
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 15px solid #fff;
    margin-left: 15px;
    position: absolute;
    top: 0;
}

.list-area {
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    margin: 0px;
    box-shadow: 0px 1px 5px #959595;
}
.dropdown-list {
    position: absolute;
    padding-top: 14px;
    width: 100%;
    z-index: 9999;
}

.pure-checkbox input[type="checkbox"] {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.pure-checkbox input[type="checkbox"]:focus + label:before,
.pure-checkbox input[type="checkbox"]:hover + label:before
 {
  border-color: #0079FE;
  background-color: #f2f2f2;
}
.pure-checkbox input[type="checkbox"]:active + label:before {
  transition-duration: 0s;
}
.pure-checkbox input[type="checkbox"] + label{
  position: relative;
  padding-left: 2em;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  margin: 0px;
  color: $label-color;
  font-weight: 300;
}
.pure-checkbox input[type="checkbox"] + label:before{
  box-sizing: content-box;
  content: '';
  color: #0079FE;
  position: absolute;
  top: 50%;
  left: 0;
  width: 14px;
  height: 14px;
  margin-top: -9px;
  border: 2px solid #0079FE;
  text-align: center;
  transition: all 0.4s ease;
}
.pure-checkbox input[type="checkbox"] + label:after{
  box-sizing: content-box;
  content: '';
  background-color: #0079FE;
  position: absolute;
  top: 50%;
  left: 4px;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  transform: scale(0);
  transform-origin: 50%;
  transition: transform 200ms ease-out;
}
.pure-checkbox input[type="checkbox"]:disabled + label:before{
  border-color: #cccccc;
}
.pure-checkbox input[type="checkbox"]:disabled:focus + label:before
.pure-checkbox input[type="checkbox"]:disabled:hover + label:before{
  background-color: inherit;
}
.pure-checkbox input[type="checkbox"]:disabled:checked + label:before{
  background-color: #cccccc;
}
.pure-checkbox input[type="checkbox"] + label:after{
  background-color: transparent;
  top: 50%;
  left: 4px;
  width: 8px;
  height: 3px;
  margin-top: -4px;
  border-style: solid;
  border-color: #ffffff;
  border-width: 0 0 3px 3px;
  border-image: none;
  transform: rotate(-45deg) scale(0);
}
.pure-checkbox input[type="checkbox"]:checked + label:after{
  content: '';
  transform: rotate(-45deg) scale(1);
  transition: transform 200ms ease-out;
}
.pure-checkbox input[type="radio"]:checked + label:before{
  background-color: white;
}
.pure-checkbox input[type="radio"]:checked + label:after{
  transform: scale(1);
}
.pure-checkbox input[type="radio"] + label:before{
  border-radius: 50%;
}
.pure-checkbox input[type="checkbox"]:checked + label:before{
  background: #0079FE;
}
.pure-checkbox input[type="checkbox"]:checked + label:after{
  transform: rotate(-45deg) scale(1);
}

  `;

let template = `
<div class="ovesh-dropdown" (clickOutside)="closeDropdown()">
<div (click)="dropDownVisible=!dropDownVisible;"  class="selected-list">
   <div class="c-btn">
   
    <div class="c-list">
    <ng-template ngIf="selectedItems.length > 0">
        <span *ngFor="let val of selectedItems; let isLast=last">
                {{val[displayKey]}}{{isLast ? '&#9660;' : ', '}}
        </span>
    </ng-template>
    <span *ngIf="selectedItems.length === 0">None Selected</span>
    </div>
    <span class="c-angle-down" *ngIf="dropDownVisible === false">
                <svg _ngcontent-c1="" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" id="Capa_1" style="enable-background:new 0 0 612 612;" version="1.1" viewBox="0 0 612 612" width="100%" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
<g>
	<g  id="_x31_0_34_">
		<g >
			<path  d="M604.501,134.782c-9.999-10.05-26.222-10.05-36.221,0L306.014,422.558L43.721,134.782
				c-9.999-10.05-26.223-10.05-36.222,0s-9.999,26.35,0,36.399l279.103,306.241c5.331,5.357,12.422,7.652,19.386,7.296
				c6.988,0.356,14.055-1.939,19.386-7.296l279.128-306.268C614.5,161.106,614.5,144.832,604.501,134.782z"></path>
		</g>
	</g>
</g>
</svg>

            </span>
            
            <span  class="c-angle-up" *ngIf="dropDownVisible === true">
                <svg  xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" id="Capa_1" style="enable-background:new 0 0 612 612;" version="1.1" viewBox="0 0 612 612" width="100%" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
<g >
	<g  id="_x39__30_">
		<g >
			<path  d="M604.501,440.509L325.398,134.956c-5.331-5.357-12.423-7.627-19.386-7.27c-6.989-0.357-14.056,1.913-19.387,7.27
				L7.499,440.509c-9.999,10.024-9.999,26.298,0,36.323s26.223,10.024,36.222,0l262.293-287.164L568.28,476.832
				c9.999,10.024,26.222,10.024,36.221,0C614.5,466.809,614.5,450.534,604.501,440.509z"></path>
		</g>
	</g>
</g>

</svg>

            </span>
            
            
    
    </div>
</div>
<div *ngIf="dropDownVisible" class="dropdown-list">
      <div class="arrow-2 arrow-up"></div>
        <div  class="arrow-up"></div>
        <div class="list-area">
    <div class="hyperMSControllerBox">
        
        <div>
            <input type="search" [(ngModel)]="filterVal" (keyup)="onKey()" class="hyperMSInput" placeholder="Filter Options">
        </div>
        <div>
            <button (click)="selectAll();" class="">All</button>
            <button (click)="selectNone();" class="">None</button>
        </div>
    </div>
    <div *ngIf="data && data.length > 0" class="hyperMSOptionsBox" name="grouplist">
        <div *ngFor="let group of groups" (click)="toggleSelection(group);" class="hyperMSGroup">
            <h4 class="option" [ngClass]="{selected: group.hyperMSSelected}" *ngIf="groups[0].name!=='hyperMSPlaceHolderGroup';">{{group.hyperMSName}}
                <span class="hyperMSRight" *ngIf="group.hyperMSSelected">&#10003;</span>
            </h4>
            <ng-template ngFor let-option [ngForOf]="inboundSelector">
                <div *ngIf="option[groupBy] === group.hyperMSName || groups[0]['displayKey']==='hyperMSPlaceHolderGroup';" (click)="toggleSelection(option, $event);"
                    class="option listItem" [ngClass]="{selected: option.hyperMSSelected}">
                    {{option[displayKey]}}
                    <span class="hyperMSRight" *ngIf="option.hyperMSSelected">&#10003;</span>
                </div>
            </ng-template>
        </div>
    </div>
    </div>
    
</div></div>`;

@Component({
  selector: 'sample-component',
  host: {
    '(document:click)': 'collapse($event)',
  },
  // Global styles imported in the app component.
  encapsulation: ViewEncapsulation.None,
  styles: [styles],
  template: template,
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION]
})
export class SampleComponent implements OnInit, ControlValueAccessor, OnChanges, Validator, AfterViewChecked {


  @Input() data: Array<any>;
  @Input() displayKey: String;
  @Input() allSelected: Boolean;
  @Input() groupBy: string;

  @Output() outbound: EventEmitter<Array<any>> = new EventEmitter();

  groups: Array<any>;
  dropDownVisible: boolean = false;
  selectedItems: Array<any>;
  inboundSelector: Array<any>;
  filterVal: String;

  constructor(private _eref: ElementRef) {
    this.selectedItems = [];
  }

  getSelectedItems(): Array<any> {
    return this.selectedItems;
  }

  toggleSelection(item, event) {
    if (item.hyperMSIsGroup) {
      item.hyperMSSelected = !item.hyperMSSelected;
      this.data.forEach(subItem => {
        if (subItem[this.groupBy] === item.hyperMSName) {
          if (item.hyperMSSelected) {
            this.selectItem(subItem);
          } else {
            this.deselectItem(subItem);
          }
        }
      });
    } else {
      if (item.hyperMSSelected) {
        this.deselectItem(item);
      } else {
        this.selectItem(item);
      }
      if (this.groups.length > 0) {
        this.checkGroupSelected(item[this.groupBy]);
      }
      event.stopPropagation();
    }
    this.notifyParent();

    console.log("Selected Items",this.selectedItems)
  }

  notifyParent() {
    this.outbound.emit(this.getSelectedItems());
  }

  checkGroupSelected(groupName) {
    let group = this.groups.filter(item => item.hyperMSName === groupName)[0];
    let noCount = this.data.filter(item => item[this.groupBy] === groupName)
        .reduce(function (count, item) {
          return count + !item.hyperMSSelected | 0;
        }, 0);
    group.hyperMSSelected = noCount === 0;
  }

  selectItem(item) {
    item.hyperMSSelected = true;
    this.selectedItems = [...this.selectedItems, item];
  }

  deselectItem(item) {
    item.hyperMSSelected = false;
    const index = this.selectedItems.indexOf(item);
    this.selectedItems = [
      ...this.selectedItems.slice(0, index),
      ...this.selectedItems.slice(index + 1)
    ];
  }

  selectAll() {
    this.groups.forEach(object => {
      object.hyperMSSelected = true;
    });
    this.data.forEach(object => {
      object.hyperMSSelected = true;
    });

    this.selectedItems = [...this.data];
    this.notifyParent();
  }

  selectNone() {
    this.groups.forEach(object => {
      object.hyperMSSelected = false;
    });
    this.data.forEach(object => {
      object.hyperMSSelected = false;
    });

    this.selectedItems = [];
    this.notifyParent();
  }

  createGroups() {
    this.groups = [];
    if (this.groupBy) {
      let groupVals = [];
      this.data.forEach(item => {
        if (groupVals.indexOf(item[this.groupBy].toLowerCase()) === -1) {
          groupVals.push(item[this.groupBy].toLowerCase());
        }
      });

      groupVals.forEach(group => {
        this.groups.push({ hyperMSName: group, hyperMSSelected: false, hyperMSIsGroup: true });
      });
    } else {
      this.groups = [{ name: "hyperMSPlaceHolderGroup" }];
    }
  }

  collapse() {
    // Checks to see if click is inside element; if not, collapse element
    if (!this._eref.nativeElement.contains(event.target)) {
      this.dropDownVisible = false;
    }
  }

  filterVals(filter, value, displayKey) {
    if (filter) {
      return value.filter(item => item[displayKey].indexOf(filter) !== -1);
    }
    return value;
  }

  onKey() {
    this.inboundSelector = this.filterVals(this.filterVal, this.data, this.displayKey);
  }

  ngOnInit() {
    this.groupBy ='type';
    this.displayKey = 'name'
    this.data = [{ id: 1, name: "item 1", type: "group1" },
      { id: 2, name: "item 2", type: "group1" },
      { id: 3, name: "item 3", type: "group1" },
      { id: 4, name: "item 4", type: "group2" }
    ];
    this.createGroups();
    if (this.allSelected) {
      this.selectAll();
    }
    this.inboundSelector = this.filterVals('', this.data, this.displayKey);

  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  validate(c: AbstractControl): ValidationErrors | any {
    return undefined;
  }

  ngAfterViewChecked(): void {
  }

  ngDoCheck() {
    if (this.selectedItems) {
      if (this.selectedItems.length == 0 || this.data.length == 0 || this.selectedItems.length < this.data.length) {
        this.allSelected = false;
      }
    }
  }
  closeDropdown(){
    this.dropDownVisible = false;
    this.filterVal = "";
  }

  removeSelected(clickedItem: any) {
    this.selectedItems && this.selectedItems.forEach(item => {
      if (clickedItem['id'] === item['id']) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
    });
  }

}
