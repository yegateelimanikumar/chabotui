import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

export interface Question {
  id: number;
  text: string;
  options?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: 1,
      text: "What type of application architecture are you considering?",
      options: ["Monolithic", "Microservices", "Serverless", "Hybrid"]
    },
    {
      id: 2,
      text: "What is your expected user load?",
      options: ["< 1000 users/day", "1000-10000 users/day", "> 10000 users/day"]
    },
    {
      id: 3,
      text: "What is your primary data storage requirement?",
      options: ["Relational Database", "NoSQL Database", "Both"]
    },
    {
      id: 4,
      text: "Do you need real-time capabilities?",
      options: ["Yes", "No", "Maybe in future"]
    },
    {
      id: 5,
      text: "What authentication mechanism do you prefer?",
      options: ["OAuth/OpenID Connect", "JWT", "Windows Authentication", "Custom Authentication"]
    },
    {
      id: 6,
      text: "What is your deployment strategy?",
      options: ["On-premises", "Cloud", "Hybrid"]
    },
    {
      id: 7,
      text: "Do you require integration with external services?",
      options: ["Yes, multiple services", "Yes, few services", "No external integrations"]
    },
    {
      id: 8,
      text: "What is your scaling strategy?",
      options: ["Vertical Scaling", "Horizontal Scaling", "Both"]
    }
  ];

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    // Simulate API delay
    return of(this.questions).pipe(delay(800));
  }

  getQuestionById(id: number): Observable<Question | undefined> {
    // Simulate API delay
    return of(this.questions.find(q => q.id === id)).pipe(delay(800));
  }
}