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
  useExisting: forwardRef(() => GroupMultiSelectComponent),
  multi: true
};
export const DROPDOWN_CONTROL_VALIDATION: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => GroupMultiSelectComponent),
  multi: true,
}
const noop = () => {
};

let styles = `
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

.checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
}

.checkbox label {
    position: relative;
    display: inline-block;
    
    /*16px width of fake checkbox + 6px distance between fake checkbox and text*/
    padding-left: 32px;
    padding-top :3px;
    cursor: pointer;
}

.checkbox label::before,
.checkbox label::after {
    position: absolute;
    content: "";
    
    /*Needed for the line-height to take effect*/
    display: inline-block;
}

/*Outer box of the fake checkbox*/
.checkbox label::before{
    height: 16px;
    width: 16px;
    
    border: 1px solid;
    left: 0px;
    
    /*(24px line-height - 16px height of fake checkbox) / 2 - 1px for the border
     *to vertically center it.
     */
    top: 3px;
}

/*Checkmark of the fake checkbox*/
.checkbox label::after {
    height: 5px;
    width: 9px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    
    transform: rotate(-45deg);
    
    left: 4px;
    top: 7px;
}

/*Hide the checkmark by default*/
.checkbox input[type="checkbox"] + label::after {
    content: none;
}

/*Unhide on the checked state*/
.checkbox input[type="checkbox"]:checked + label::after {
    content: "";
}

/*Adding focus styles on the outer-box of the fake checkbox*/
.checkbox input[type="checkbox"]:focus + label::before {
    outline: rgb(59, 153, 252) auto 5px;
}

.c-token {
    list-style: none;
    padding: 2px 8px;
    background: #0079FE;
    color: #fff;
    border-radius: 2px;
    margin-right: 4px;
    margin-top: 2px;
    float: left;
    position: relative;
    padding-right: 25px;
}
.selected-list .c-list .c-token .c-label {
    display: block;
    float: left;
}
.selected-list .c-list .c-token .c-remove {
    position: absolute;
    right: 8px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 10px;
}
.select-all{
    padding: 10px;
    border-bottom: 1px solid #ccc;
    text-align: left;
}
[role=button], a, area, button, input:not([type=range]), label, select, summary, textarea {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
}

.list-filter {
  border-bottom: 1px solid #ccc;
  position: relative;
  padding-left: 35px;
  height: 35px; }
  .list-filter   input {
    border: 0px;
    width: 100%;
    height: 100%;
    padding: 0px; }
  .list-filter   input:focus {
    outline: none; }
  .list-filter  .c-search {
    position: absolute;
    top: 9px;
    left: 10px;
    width: 15px;
    height: 15px; }
    .list-filter   .c-search   svg {
      fill: #888; }
      
      .dropdown-list ul {
          padding: 0px;
          list-style: none;
          overflow: auto;
          margin: 0px;
        }
      .list-grp {
          padding: 0 15px !important;
      }
      
      .dropdown-list ul li {
        padding: 10px 10px;
        cursor: pointer;
        text-align: left;
      }
      .list-grp h4 {
          text-transform: capitalize;
          margin: 15px 0px 5px 0px;
          font-size: 14px;
          font-weight: 700;
       }
       
       .selected-list .c-list .c-token .c-remove svg {
          fill: #fff;
        }

  `;

let template = `
<div class="ovesh-dropdown" (clickOutside)="closeDropdown()">
<div (click)="dropDownVisible=!dropDownVisible;"  class="selected-list">
   <div class="c-btn">
   
    <div class="c-list">
    
    <ng-template ngIf="selectedItems.length > 0">
    <div class="c-token" *ngFor="let val of selectedItems; let isLast=last">
   
        <span class="c-label" >
                {{val[displayKey]}}
        </span>
        <span  class="c-remove" (click)="removeSelected(val)" >
                        <svg  xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%"  style="enable-background:new 0 0 47.971 47.971;" version="1.1" viewBox="0 0 47.971 47.971" width="100%" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
<g>
	<path  d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
		c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
		C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
		s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"></path>
</g>
</svg>

                    </span>
                    </div>
    </ng-template>
    
    
    
    <span *ngIf="selectedItems.length === 0">Select</span>
    </div>
    <span class="c-angle-down" *ngIf="dropDownVisible === false">
                <svg  xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%"  style="enable-background:new 0 0 612 612;" version="1.1" viewBox="0 0 612 612" width="100%" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
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
          
            <div class="checkbox select-all">
              <input type="checkbox" [checked]="isChecked" (change)="onChangeCheckBox($event)" id="checkbox_1">
              <label for="checkbox_1">  <span *ngIf="selectedItems && selectedItems.length === 0"> Select All </span> <span *ngIf="selectedItems && selectedItems.length > 0" >UnSelect All</span> </label>
            </div>
            
            <div  class="list-filter">
                <span  class="c-search">
                    <svg  xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" id="Capa_1" style="enable-background:new 0 0 615.52 615.52;" version="1.1" viewBox="0 0 615.52 615.52" width="100%" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
<g >
	<g >
		<g  id="Search__x28_and_thou_shall_find_x29_">
			<g >
				<path  d="M602.531,549.736l-184.31-185.368c26.679-37.72,42.528-83.729,42.528-133.548C460.75,103.35,357.997,0,231.258,0
					C104.518,0,1.765,103.35,1.765,230.82c0,127.47,102.753,230.82,229.493,230.82c49.53,0,95.271-15.944,132.78-42.777
					l184.31,185.366c7.482,7.521,17.292,11.291,27.102,11.291c9.812,0,19.62-3.77,27.083-11.291
					C617.496,589.188,617.496,564.777,602.531,549.736z M355.9,319.763l-15.042,21.273L319.7,356.174
					c-26.083,18.658-56.667,28.526-88.442,28.526c-84.365,0-152.995-69.035-152.995-153.88c0-84.846,68.63-153.88,152.995-153.88
					s152.996,69.034,152.996,153.88C384.271,262.769,374.462,293.526,355.9,319.763z"></path>
			</g>
		</g>
	</g>
</g>

</svg>

                </span>
                <input  class="c-input" type="text" placeholder="Search" [(ngModel)]="filterVal" (keyup)="onKey()" >
                
            </div>
      
        
  
    <div *ngIf="data && data.length > 0"  name="grouplist" style="overflow: auto; max-height: 300px;">
        <div *ngFor="let group of groups;let i = index" (click)="toggleSelection(group);" class="">
          <ul class="list-grp">
            <h4 class="" [ngClass]="{selected: group.angularMSSelected}" *ngIf="groups[0].name!=='angularMSPlaceHolderGroup';">
             
               <div class="checkbox ">
              <input type="checkbox" [checked]="group.angularMSSelected" (change)="onChangeCheckBox($event)" >
              <label > {{group.angularMSName}} </label>
            </div>
              
               
            </h4>
            
            <ng-template ngFor let-option [ngForOf]="inboundSelector">
                <li *ngIf="option[groupBy] === group.angularMSName || groups[0]['displayKey']==='angularMSPlaceHolderGroup';" (click)="toggleSelection(option, $event);"
                    class="" [ngClass]="{selected: option.angularMSSelected}">
                    
                    
                     <div class="checkbox ">
              <input type="checkbox" [checked]="option.angularMSSelected" (change)="onChangeCheckBox($event)" >
              <label > {{option[displayKey]}}  </label>
            </div>
                    
               
                </li>
            </ng-template>
            
           </ul> 
        </div>
    </div>
    </div>
    
</div></div>`;

@Component({
  selector: 'group-multi-select',
  host: {
    '(document:click)': 'collapse($event)',
  },
  // Global styles imported in the app component.
  encapsulation: ViewEncapsulation.None,
  styles: [styles],
  template: template,
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR, DROPDOWN_CONTROL_VALIDATION]
})
export class GroupMultiSelectComponent implements OnInit, ControlValueAccessor, OnChanges, Validator, AfterViewChecked {

  isChecked : boolean;
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
    if (item.angularMSIsGroup) {
      item.angularMSSelected = !item.angularMSSelected;
      this.data.forEach(subItem => {
        if (subItem[this.groupBy] === item.angularMSName) {
          if (item.angularMSSelected) {
            this.selectItem(subItem);
          } else {
            this.deselectItem(subItem);
          }
        }
      });
    } else {
      if (item.angularMSSelected) {
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

    if(this.selectedItems.length === this.data.length){
      this.isChecked = true;
    }else {
      this.isChecked = false;
    }
  }

  notifyParent() {
    this.outbound.emit(this.getSelectedItems());
  }

  checkGroupSelected(groupName) {
    let group = this.groups.filter(item => item.angularMSName === groupName)[0];
    let noCount = this.data.filter(item => item[this.groupBy] === groupName)
        .reduce(function (count, item) {
          return count + !item.angularMSSelected | 0;
        }, 0);
    group.angularMSSelected = noCount === 0;
  }

  selectItem(item) {
    item.angularMSSelected = true;
    this.selectedItems = [...this.selectedItems, item];
  }

  deselectItem(item) {
    item.angularMSSelected = false;
    const index = this.selectedItems.indexOf(item);
    this.selectedItems = [
      ...this.selectedItems.slice(0, index),
      ...this.selectedItems.slice(index + 1)
    ];
  }

  selectAll() {
    this.groups.forEach(object => {
      object.angularMSSelected = true;
    });
    this.data.forEach(object => {
      object.angularMSSelected = true;
    });

    this.selectedItems = [...this.data];
    this.notifyParent();
  }

  selectNone() {
    this.groups.forEach(object => {
      object.angularMSSelected = false;
    });
    this.data.forEach(object => {
      object.angularMSSelected = false;
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
        this.groups.push({ angularMSName: group, angularMSSelected: false, angularMSIsGroup: true });
      });
    } else {
      this.groups = [{ name: "angularMSPlaceHolderGroup" }];
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
    //this.groupBy ='type';
   // this.displayKey = 'name'
    /*this.data = [{ id: 1, name: "item 1", type: "group1" },
      { id: 2, name: "item 2", type: "group1" },
      { id: 3, name: "item 3", type: "group1" },
      { id: 4, name: "item 4", type: "group2" }
    ];*/
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
    this.selectedItems && this.selectedItems.forEach((item, index) => {
      if (clickedItem['id'] === item['id']) {
        this.selectedItems[index].angularMSSelected = false;
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        if(this.selectedItems && this.selectedItems.length === 0){
          this.isChecked = false;
        }
      }
    });
  }

  onChangeCheckBox(event){
    if(event && event.target.checked === true){
      this.selectAll();
    }else {
      this.selectNone();
    }
  }

}
