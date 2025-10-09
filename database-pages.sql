-- Create pages table for managing website pages content
-- This table stores content for Privacy Policy, Terms of Service, and Cookie Policy

CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    meta_description VARCHAR(500),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups by slug
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published);

-- Insert default content for legal pages
INSERT INTO pages (slug, title, content, meta_description, is_published) VALUES
('privacy-policy', 'Privacy Policy',
'# Privacy Policy

Last updated: ' || CURRENT_DATE || '

## 1. Introduction

Welcome to NextLink ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

## 2. Information We Collect

We collect information that you provide directly to us, including:
- Name and contact information
- Email address
- Phone number
- Project details and requirements
- Any other information you choose to provide

## 3. How We Use Your Information

We use the information we collect or receive to:
- Respond to your inquiries and fulfill your requests
- Provide, maintain, and improve our services
- Send you technical notices, updates, and support messages
- Communicate with you about products, services, and events

## 4. Contact Us

If you have any questions about this Privacy Policy, please contact us.',
'Learn how NextLink collects, uses, and protects your personal information.', true),

('terms-of-service', 'Terms of Service',
'# Terms of Service

Last updated: ' || CURRENT_DATE || '

## 1. Agreement to Terms

These Terms of Service constitute a legally binding agreement made between you and NextLink ("we," "us," or "our"), concerning your access to and use of our website and services.

## 2. Intellectual Property Rights

Unless otherwise indicated, the site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site are owned or controlled by us or licensed to us.

## 3. User Representations

By using the site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete.

## 4. Services Description

NextLink provides smart home automation and technology integration services. We reserve the right to refuse service to anyone for any reason at any time.

## 5. Contact Us

If you have any questions about these Terms of Service, please contact us.',
'Read NextLink Terms of Service and understand your rights and obligations.', true),

('cookie-policy', 'Cookie Policy',
'# Cookie Policy

Last updated: ' || CURRENT_DATE || '

## 1. What Are Cookies?

Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.

## 2. How We Use Cookies

NextLink uses cookies to:
- Ensure our website functions properly
- Remember your preferences and settings
- Understand how you use our website
- Improve your browsing experience

## 3. Types of Cookies We Use

### Essential Cookies
These cookies are necessary for the website to function properly.

### Performance Cookies
These cookies allow us to count visits and traffic sources.

### Functionality Cookies
These cookies enable enhanced functionality and personalization.

## 4. Managing Cookies

Most web browsers allow you to control cookies through their settings preferences.

## 5. Contact Us

If you have any questions about our use of cookies, please contact us.',
'Learn about how NextLink uses cookies and how to manage them.', true)

ON CONFLICT (slug) DO NOTHING;
