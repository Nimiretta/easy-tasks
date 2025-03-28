import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../environments/enviroment';
import { Message } from '../../../models/message.model';

@Injectable()
export class AssistantService {
  private apiUrl = `${environment.apiBaseUrl}assistant/`;

  constructor(private http: HttpClient) {}

  //uncomment when want real data
  getSuggestion(message: Message[]): Observable<string> {
    return this.http.post<string>(this.apiUrl, message[message.length - 1].content);
  }
  //mock method
  // getSuggestion(message: Message[]): Observable<string> {
  //   return of(`{
  //     "answerText": "Given your free time constraint and the tasks at hand, I recommend you help your classmate with the OOP topic test and then if you still have time, start learning JS prototyping. These tasks are sooner in priority and have upcoming deadlines.",
  //     "pickedTasksArray": ["8e3b676d-cb64-41d3-9ce7-88568fbc6b68", "02f66dd9-b771-4df5-a34b-8b795dc02028"]
  //   }`);
  // }
}
