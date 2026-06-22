import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { BenefitsService } from '../../services/benefits.service';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MarkdownModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: Message[] = [
    {
      role: 'bot',
      text: '🙏 Namaste! I am your Community Benefits Assistant. Ask me anything about government schemes, scholarships, health benefits, or food support. I am here to help!',
      time: new Date()
    }
  ];

  userInput = '';
  isLoading = false;

  constructor(private benefitsService: BenefitsService) {}

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMsg = this.userInput.trim();
    this.messages.push({ role: 'user', text: userMsg, time: new Date() });
    this.userInput = '';
    this.isLoading = true;

    this.benefitsService.askChat(userMsg).subscribe({
      next: (res) => {
        this.messages.push({ role: 'bot', text: res.reply, time: new Date() });
        this.isLoading = false;
      },
      error: () => {
        this.messages.push({
          role: 'bot',
          text: '⚠️ Sorry, I could not connect to the server. Please try again. If urgent, call helpline: 14223',
          time: new Date()
        });
        this.isLoading = false;
      }
    });
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  quickQuestions = [
    'What is Ayushman Bharat?',
    'Scholarships for OBC students in Karnataka',
    'How to apply for ration card?',
    'PM-KISAN eligibility criteria'
  ];

  askQuick(q: string) {
    this.userInput = q;
    this.sendMessage();
  }
}