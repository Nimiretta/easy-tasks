import { Component, EventEmitter, Output } from '@angular/core';

import { FastPrompt } from '../../../models/fast-prompt.model';

@Component({
  selector: 'tc-fast-prompt',
  templateUrl: './fast-prompt.component.html',
  styleUrls: ['./fast-prompt.component.scss'],
})
export class FastPromptComponent {
  @Output()
  fastPromptEvent = new EventEmitter<string>();

  @Output()
  typeYourselfEvent = new EventEmitter<string>();

  options: FastPrompt[] = [
    {
      buttonName: 'I have a few minutes without laptop',
      prompt: 'I have a few minutes without laptop right now, what can I do',
    },
    {
      buttonName: 'One hour of free time',
      prompt: 'I have one hour of free time, what can I do now',
    },
    {
      buttonName: 'Free day',
      prompt: 'I have a free day today',
    },
  ];

  fastPrompt(value: string): void {
    this.fastPromptEvent.emit(value);
  }

  typeYourself(): void {
    this.typeYourselfEvent.emit();
  }
}
