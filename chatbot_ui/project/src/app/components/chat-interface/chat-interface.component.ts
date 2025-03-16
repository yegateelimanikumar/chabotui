import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionService, Question } from '../../services/question.service';

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule, MatProgressSpinnerModule],
  template: `
    <div class="min-h-screen bg-gray-100 p-4">
      <div class="max-w-3xl mx-auto">
        <mat-card class="mb-4 p-6">
          <mat-card-header>
            <mat-card-title class="text-2xl mb-4">Architecture Assistant</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <div class="space-y-4">
              <div *ngFor="let message of chatHistory" 
                   class="p-4 rounded-lg" 
                   [ngClass]="message.isBot ? 'bg-blue-100 ml-4' : 'bg-gray-100 mr-4'">
                <p class="text-gray-800">{{ message.text }}</p>
              </div>
            </div>

            <div *ngIf="loading" class="flex justify-center my-4">
              <mat-spinner diameter="40"></mat-spinner>
            </div>

            <div *ngIf="currentQuestion && !loading" class="mt-6">
              <p class="font-medium text-lg mb-4">{{ currentQuestion.text }}</p>
              <div class="space-y-2">
                <button *ngFor="let option of currentQuestion.options"
                        mat-raised-button
                        color="primary"
                        class="w-full mb-2"
                        (click)="selectOption(option)">
                  {{ option }}
                </button>
              </div>
            </div>

            <div *ngIf="error" class="mt-6 p-4 bg-red-100 rounded-lg">
              <p class="text-red-700">{{ error }}</p>
              <button mat-raised-button
                      color="warn"
                      class="mt-4"
                      (click)="retry()">
                Retry
              </button>
            </div>

            <div *ngIf="completed" class="mt-6 text-center">
              <p class="text-xl font-medium text-green-600">Thank you for completing the questionnaire!</p>
              <button mat-raised-button
                      color="accent"
                      class="mt-4"
                      (click)="restart()">
                Start Over
              </button>
            </div>
          </mat-card-content>

          <mat-card-footer>
            <mat-progress-bar mode="determinate"
                             [value]="(currentQuestionIndex / totalQuestions) * 100">
            </mat-progress-bar>
          </mat-card-footer>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ChatInterfaceComponent implements OnInit {
  chatHistory: Array<{ text: string; isBot: boolean }> = [];
  currentQuestion?: Question;
  currentQuestionIndex = 0;
  totalQuestions = 8;
  completed = false;
  loading = false;
  error: string | null = null;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.startChat();
  }

  startChat() {
    this.chatHistory = [];
    this.error = null;
    this.addBotMessage('Hello! I\'m your Architecture Assistant. I\'ll help you make decisions about your .NET application architecture. Let\'s begin!');
    this.loadNextQuestion();
  }

  loadNextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions) {
      this.loading = true;
      this.error = null;
      this.questionService.getQuestionById(this.currentQuestionIndex + 1).subscribe({
        next: (question) => {
          if (question) {
            this.currentQuestion = question;
            this.loading = false;
          }
        },
        error: (err) => {
          this.error = 'Failed to load question. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.completed = true;
      this.currentQuestion = undefined;
      this.addBotMessage('Based on your responses, I can provide a detailed architecture recommendation. Would you like to start over?');
    }
  }

  selectOption(option: string) {
    this.addUserMessage(option);
    this.currentQuestionIndex++;
    this.addBotMessage(this.getResponseForOption(option));
    this.loadNextQuestion();
  }

  addUserMessage(text: string) {
    this.chatHistory.push({ text, isBot: false });
  }

  addBotMessage(text: string) {
    this.chatHistory.push({ text, isBot: true });
  }

  getResponseForOption(option: string): string {
    const responses = [
      'Interesting choice! Let\'s explore that further.',
      'That\'s a good decision. Let\'s continue with the next question.',
      'I understand your preference. Moving forward...',
      'Great choice! Let\'s proceed with the next aspect.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  retry() {
    this.loadNextQuestion();
  }

  restart() {
    this.currentQuestionIndex = 0;
    this.completed = false;
    this.startChat();
  }
}