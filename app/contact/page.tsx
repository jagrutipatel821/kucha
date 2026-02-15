'use client';

import React, { useRef, useState } from 'react';
import {
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';

/* =====================
   DATA CONFIG
===================== */

const CONTACTS = [
  {
    name: 'Kalpesh Kucha',
    role: 'Owner',
    phone: '+91 76238 45944',
    tel: '917623845944',
    note: 'Product inquiries, wholesale & custom orders.',
  },
  {
    name: 'Sanjay Kucha',
    role: 'Partner',
    phone: '+91 97123 92232',
    tel: '919712392232',
    note: 'Support, orders and after-sales assistance.',
  },
];

const BUSINESS_INFO = {
  name: 'KUCHA ENTERPRISE',
  email: 'kuchaent.12@gmail.com',
  address: [
    'D/7, Keval Shopping Centre',
    'Old National Highway, Ankleshwar - 393002',
    'Gujarat, India',
  ],
  gst: '24HGFPK7521C1ZN',
};

/* =====================
   PAGE
===================== */

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />
      <BusinessInfoSection />
      <ContactsSection />
      <MapSection />
      <ContactForm />
    </div>
  );
}

/* =====================
   SECTIONS
===================== */

function HeroSection() {
  return (
    <section
      className="relative h-[420px] flex items-center justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,.55), rgba(0,0,0,.15)), url('/images/hero-banner.png')",
      }}
    >
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          KUCHA <span className="text-yellow-400">ENTERPRISE</span>
        </h1>
        <p className="mt-3 text-lg md:text-xl">
          All Types of Industrial Hardware Goods
        </p>

        <a
          href={`mailto:${BUSINESS_INFO.email}`}
          className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-md hover:bg-white/20 transition"
        >
          <Mail className="w-4 h-4" />
          {BUSINESS_INFO.email}
        </a>
      </div>
    </section>
  );
}

function BusinessInfoSection() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-8">
      <InfoCard icon={<MapPin />} title="Our Shop">
        <p className="text-gray-600">
          <strong>{BUSINESS_INFO.name}</strong>
          <br />
          {BUSINESS_INFO.address.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <p className="mt-4 text-sm text-gray-500">
          GSTIN: <span className="font-medium">{BUSINESS_INFO.gst}</span>
        </p>
      </InfoCard>

      <InfoCard icon={<Clock />} title="Opening Hours">
        <p className="text-gray-600">
          Mon - Fri: 10:00 AM - 6:00 PM
          <br />
          Saturday: 9:00 AM - 4:00 PM
          <br />
          Sunday: Closed
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Prefer WhatsApp for fastest response
        </p>
      </InfoCard>

      <InfoCard icon={<Mail />} title="Email">
        <p className="text-gray-600">{BUSINESS_INFO.email}</p>
      </InfoCard>
    </section>
  );
}

function ContactsSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Contact People
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {CONTACTS.map((person, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.role}</p>
                </div>

                <div className="flex gap-3">
                  <a
                    href={`tel:${person.tel}`}
                    className="inline-flex items-center gap-2 text-sm hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    {person.phone}
                  </a>

                  <a
                    href={`https://wa.me/${person.tel}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <p className="text-gray-600">{person.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps?q=Ankleshwar,+Gujarat&output=embed"
          width="100%"
          height="420"
          loading="lazy"
          style={{ border: 0 }}
        />
      </div>
    </section>
  );
}

/* =====================
   CONTACT FORM
===================== */
function ContactForm() {
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const buildMessages = (formData: FormData) => {
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    return { name, email, subject, message };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const { name, email, subject, message } = buildMessages(formData);

    if (!name || !email || !subject) {
      setError('Please fill Name, Email and Subject.');
      return;
    }

    const mailSubject = `Enquiry: ${subject}`;
    const mailBody = [
      `Hello ${BUSINESS_INFO.name},`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      message || '-',
    ].join('\n');

    const params = new URLSearchParams({
      subject: mailSubject,
      body: mailBody,
    });

    window.location.href = `mailto:${BUSINESS_INFO.email}?${params.toString()}`;
  };

  const handleWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const { name, email, subject, message } = buildMessages(formData);

    if (!name || !email || !subject) {
      setError('Please fill Name, Email and Subject before WhatsApp chat.');
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Hello Kucha Enterprise,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message || '-'}`
    );

    const whatsappNumber = '917623845944';
    window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Ask a Question
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <Input name="name" placeholder="Your Name" required />
        <Input name="email" type="email" placeholder="Your Email" required />
        <Input
          name="subject"
          placeholder="Subject"
          className="md:col-span-2"
          required
        />
        <Textarea name="message" placeholder="Your Message (optional)" />

        <div className="md:col-span-2 flex flex-col md:flex-row gap-3 justify-between">
          <button
            type="submit"
            className="bg-yellow-500 text-white py-3 rounded-md font-medium hover:bg-yellow-600 transition md:w-1/4"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </button>
        </div>

        {error && (
          <p className="md:col-span-2 text-red-600 text-center font-medium">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}

/* =====================
   REUSABLE UI
===================== */

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="text-yellow-500 w-10 h-10 mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none ${props.className || ''}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={5}
      className={`border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none md:col-span-2 ${props.className || ''}`}
    />
  );
}
