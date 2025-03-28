import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from '../../../../environments/enviroment';
import { Message } from '../../../models/message.model';

@Injectable()
export class AssistantService {
  private apiUrl = `${environment.apiBaseUrl}assistant/`;

  constructor(private http: HttpClient) {}

  //uncomment when want real data
  getSuggestion(message: Message[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, {"Content": message[message.length - 1]}).pipe(
      map((response: any) => {
        return response.response
      })
    )
  }
  //mock method
  // getSuggestion(message: Message[]): Observable<string> {
  //   return of(`{
  //     "answerText": "Given your free time constraint and the tasks at hand, I recommend you help your classmate with the OOP topic test and then if you still have time, start learning JS prototyping. These tasks are sooner in priority and have upcoming deadlines.",
  //     "pickedTasksArray": ["8e3b676d-cb64-41d3-9ce7-88568fbc6b68", "02f66dd9-b771-4df5-a34b-8b795dc02028"]
  //   }`);
  // }
}
