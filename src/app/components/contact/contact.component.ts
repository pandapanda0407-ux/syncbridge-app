import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_ig5lc7t';
const TEMPLATE_ID = 'template_aey2o7f';
const PUBLIC_KEY  = 'J2N708HmgT-jmmsxh';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = '';
  email = '';
  shopUrl = '';
  message = '';
  submitted = signal(false);
  submitting = signal(false);

  async onSubmit() {
    if (!this.name || !this.email || !this.message) return;
    this.submitting.set(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: this.name,
        email: this.email,
        shop_url: this.shopUrl,
        message: this.message,
      }, PUBLIC_KEY);
      this.submitted.set(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      this.submitting.set(false);
    }
  }
}
