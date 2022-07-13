import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';

import jsonDoc from './doc';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateBookComponent implements OnInit, OnDestroy {
  @ViewChild('defaultPage') myDefaultPage;
  color: any;
  
  viewTextualComp: boolean = false;
  viewBgColorComp: boolean = false;

  constructor() { 
  }

  @ViewChild('dragText') draggableTxt = null;
  
  // working with text component
  text() {
    console.log('Hello from Text');
    this.viewTextualComp = !this.viewTextualComp; 
  }
  editordoc = jsonDoc;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false },
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  // working with background color component
  backgroundColor() {
    console.log('Hello from bgColor');
    this.viewBgColorComp = !this.viewBgColorComp;
  }

  updateColor($event) {
      this.myDefaultPage.nativeElement.style.backgroundColor  = this.color;
  }


  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
