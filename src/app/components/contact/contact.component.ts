import { IconComponent } from '../../shared/icon.component';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

// These are EmailJS dashboard IDs, not secrets — the public key is meant to
// ship in the client. They are also the form's single point of failure: if the
// service or template is recreated in the dashboard, the IDs change and every
// submission fails with a 400 until these are updated to match.
const SERVICE_ID  = 'service_mnxeog7';
const TEMPLATE_ID = 'template_u81rlwn';
const PUBLIC_KEY  = 'J2N708HmgT-jmmsxh';

// The inbox that receives form submissions. EmailJS decides the real recipient
// from the template's "To Email" field, so that field must be set to
// {{to_email}} in the dashboard for this value to take effect.
const SUPPORT_INBOX = 'support@syncebridge.com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
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
  error = signal('');

  async onSubmit() {
    if (this.submitting()) return;

    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      this.error.set('Please fill in your name, email and message.');
      return;
    }

    this.error.set('');
    this.submitting.set(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: SUPPORT_INBOX,
        name: this.name,
        email: this.email,
        reply_to: this.email,
        shop_url: this.shopUrl || 'Not provided',
        message: this.message,
      }, PUBLIC_KEY);
      this.submitted.set(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      this.error.set(
        `Sorry, we couldn't send your message. Please email us directly at ${SUPPORT_INBOX}.`
      );
    } finally {
      this.submitting.set(false);
    }
  }
}
