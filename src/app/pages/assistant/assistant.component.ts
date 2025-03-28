import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MessageService } from '../../common/services/message.service';
import { UserService } from '../../common/services/user.service';
import { Message, ParsedMessage } from '../../models/message.model';
import { UserRole } from '../../models/user-role.model';
import { AssistantService } from './service/assistant.service';
import { SpinnerService } from '../../common/services/spinner.service';

@Component({
  selector: 'tc-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnDestroy, AfterViewChecked {
  private ngUnsubscribe$ = new Subject<void>();
  role: typeof UserRole = UserRole;

  inputValue = '';
  messages: Observable<Message[]>;

  userRole$: Observable<UserRole>;

  @ViewChild('inputMessage') inputMessage: ElementRef;
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  constructor(
    private userService: UserService,
    private assistantService: AssistantService,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
  ) {
    this.messages = this.messageService.messages$;
    this.userRole$ = this.userService.userRole$;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onRequestAccess(): void {
    this.userService.requestAssistantAccess().pipe(takeUntil(this.ngUnsubscribe$)).subscribe();
  }

  trackByMessage(i: number): number {
    return i;
  }

  trackById(i: number, id: string): string {
    return id;
  }

  onInput(): void {
    if (this.inputValue.trim()) {
      this.sendMessage({ content: this.inputValue.trim(), role: 'user' });
      this.inputValue = '';
    }
  }

  onFastButton(prompt: string): void {
    this.sendMessage({ content: prompt, role: 'user' });
    this.scrollToBottom();
  }

  onFastType(): void {
    this.inputMessage.nativeElement.focus();
  }

  sendMessage(message: Message): void {
    this.spinnerService.showSpinner()
    this.messageService.addNewMessage(message);
    this.assistantService
      .getSuggestion(this.messageService.getMessages())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((message) => {
        this.messageService.addNewMessage({ content: message, role: 'assistant' });
        this.spinnerService.hideSpinner();
        this.scrollToBottom();
      });
  }

  parseMessage(message: Message): ParsedMessage {
    const answer = {
      tasksPresent: false,
      text: '',
      tasks: null,
    };
    if (message.role === 'user') {
      answer.text = message.content;
    } else {
      try {
        const t = JSON.parse(message.content);
        answer.text = t.answerText;
        answer.tasks = t.pickedTasksArray;
        answer.tasksPresent = t.pickedTasksArray.length !== 0;
      } catch {
        answer.text = message.content;
      }
    }
    return answer;
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
