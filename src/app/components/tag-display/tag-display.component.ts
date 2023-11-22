import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-tag-display',
  template: `
  <ng-template #recursiveTree let-node="sub">
  <div class="collapse-content " *ngFor="let b of x.subsecciones">
  <div class="collapse collapse-arrow">
    <input type="radio" name="my-accordion-3" checked="checked" />
  <div class="collapse-title font-medium text-base">
    {{b.nombre}}
  </div>
  <div class="collapse-content join join-vertical text-base">
    <a class="join-item" *ngFor="let c of b.finales" href="">{{c.nombre}}</a>
  </div>
  <div *ngIf="b.subsecciones.length">
    <div *ngFor="let c of b.subsecciones" >
    <ng-container [ngTemplateOutlet]="recursiveTree" [ngTemplateOutletContext]="{ sub:c}"></ng-container>
</div>
</div>
</div>
</div> 
</ng-template>
<ng-template [ngTemplateOutlet]="recursiveTree" [ngTemplateOutletContext]="{ sub:x}"></ng-template>
`,
  styleUrls: ['./tag-display.component.css']
})
export class TagDisplayComponent {
  @Input() x:any
}
