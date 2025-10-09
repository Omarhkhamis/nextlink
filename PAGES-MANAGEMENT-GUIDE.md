# Pages Management System - Complete Guide

A new Pages section has been added to your admin dashboard where you can manage your website's legal pages (Privacy Policy, Terms of Service, and Cookie Policy) directly from the admin panel.

## Features

### What's Included
- **Admin Dashboard Section**: Manage all pages from `/admin/dashboard/pages`
- **Three Pre-configured Pages**:
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
- **Markdown Editor**: Write and format content using Markdown
- **Live Preview**: See changes before publishing
- **Publish/Unpublish**: Control page visibility
- **Auto-save Timestamps**: Track when pages were last updated

## Database Setup

### Required Migration
Run the SQL script in `database-pages.sql` to create the pages table:

```bash
psql -h 77.37.125.44 -U nextlink_user -d nextlink -f database-pages.sql
```

This will:
1. Create the `pages` table
2. Set up indexes for performance
3. Insert default content for all three legal pages
4. Create the necessary database structure

### Table Structure
```sql
CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    meta_description VARCHAR(500),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## How to Use

### Access Pages Management

1. Log in to admin dashboard at `https://nextlinkuae.com/admin`
2. Click "Pages" in the sidebar navigation
3. You'll see three pages listed:
   - Privacy Policy
   - Terms of Service
   - Cookie Policy

### Edit a Page

1. **Select the Page**: Click on any page from the sidebar
2. **Edit Content**:
   - **Title**: Update the page title
   - **Meta Description**: Brief description for SEO (160 characters max)
   - **Content**: Full page content in Markdown format
   - **Published Status**: Toggle to show/hide page from public

3. **Save Changes**: Click "Save Changes" button
4. **Preview**: Click "Preview Changes" to see how it looks on the website

### Markdown Formatting

Pages support Markdown for easy formatting:

#### Headings
```markdown
# Main Heading (H1)
## Section Heading (H2)
### Subsection Heading (H3)
```

#### Text Formatting
```markdown
**Bold text**
*Italic text*
[Link text](https://example.com)
```

#### Lists
```markdown
- Bullet point 1
- Bullet point 2
- Bullet point 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3
```

#### Paragraphs
Just write text with blank lines between paragraphs.

### Publish/Unpublish Pages

- **Toggle the Published switch** at the top of the editor
- When **Published = ON**: Page is visible to public visitors
- When **Published = OFF**: Page shows "Page Not Found" to visitors
- Changes take effect immediately after saving

## Frontend Display

### How Pages Appear on Website

Each page:
- Shows the title prominently
- Displays last updated date
- Renders Markdown content with proper formatting
- Uses consistent styling with your website theme
- Includes proper heading hierarchy
- Has clickable links in brand blue color

### Page URLs

- Privacy Policy: `https://nextlinkuae.com/privacy-policy`
- Terms of Service: `https://nextlinkuae.com/terms-of-service`
- Cookie Policy: `https://nextlinkuae.com/cookie-policy`

All pages are already linked in your website footer under the "Legal" section.

## Default Content

Each page comes with professional placeholder content covering:

### Privacy Policy
- Introduction
- Information collection
- Data usage
- Information sharing
- Data security
- Contact information

### Terms of Service
- Agreement to terms
- Intellectual property
- User representations
- Service description
- Contact information

### Cookie Policy
- What cookies are
- How cookies are used
- Types of cookies
- Managing cookies
- Contact information

**Important**: These are placeholder templates. You should customize them with your actual company information and legal requirements.

## Customization Tips

### What to Update

1. **Contact Information**
   - Replace placeholder email, phone, address
   - Add your actual contact details in all three pages

2. **Company-Specific Details**
   - Update company name references
   - Add specific services you offer
   - Include jurisdiction information
   - Add any specific legal requirements

3. **Date Information**
   - Pages auto-update the "Last updated" date
   - Make sure to review and update content regularly

### Recommended Sections to Add

For Privacy Policy:
- Data retention periods
- Third-party services you use (analytics, etc.)
- Children's privacy policies
- International data transfers

For Terms of Service:
- Specific warranty disclaimers
- Refund and cancellation policies
- Dispute resolution process
- Termination clauses

For Cookie Policy:
- Specific cookies your site uses
- Cookie consent mechanism
- Third-party analytics details

## SEO Benefits

### Meta Descriptions
- 160 character limit
- Summarizes page content
- Shows in search results
- Improves click-through rates

### Best Practices
- Use clear, descriptive titles
- Write unique meta descriptions
- Keep URLs simple and readable
- Update content regularly

## API Endpoints

The following API endpoints are available:

### Get All Pages
```
GET /api/pages
Returns: Array of all pages
```

### Get Specific Page
```
GET /api/pages/[slug]
Parameters: slug (privacy-policy, terms-of-service, cookie-policy)
Returns: Single page object
```

### Update Page
```
PUT /api/pages/[slug]
Body: {
  title: string,
  content: string,
  meta_description: string,
  is_published: boolean
}
Returns: Updated page object
```

## Troubleshooting

### Page Not Loading
1. Check database connection
2. Verify `pages` table exists: `\d pages` in psql
3. Ensure page slug is correct in URL
4. Check browser console for errors

### Content Not Saving
1. Verify you clicked "Save Changes"
2. Check for success message
3. Refresh the page to see saved content
4. Check PostgreSQL logs for errors

### Markdown Not Rendering
1. Ensure you're using proper Markdown syntax
2. Leave blank lines between sections
3. Check the preview before saving
4. Verify Markdown package is installed

### Page Shows "Not Found"
1. Check if page is published (toggle switch)
2. Verify slug matches URL
3. Run database migration if table doesn't exist
4. Check API endpoint is responding

## Technical Details

### Component Structure
```
/app/admin/dashboard/pages/page.tsx - Admin editor interface
/app/privacy-policy/page.tsx - Privacy policy frontend
/app/terms-of-service/page.tsx - Terms frontend
/app/cookie-policy/page.tsx - Cookie policy frontend
/app/api/pages/route.ts - GET all pages API
/app/api/pages/[slug]/route.ts - GET/PUT specific page API
```

### Dependencies
- `react-markdown` - Renders Markdown content
- Uses your existing UI components
- Integrated with admin dashboard layout

### Security
- All pages use parameterized queries to prevent SQL injection
- Admin routes require authentication
- Public pages are read-only
- Input is sanitized automatically

## Best Practices

1. **Regular Updates**
   - Review pages quarterly
   - Update with business changes
   - Keep dates current

2. **Legal Compliance**
   - Consult with legal counsel
   - Comply with GDPR, CCPA, etc.
   - Match your actual practices

3. **Clear Language**
   - Use plain English
   - Avoid legal jargon when possible
   - Be specific about practices

4. **Consistent Formatting**
   - Use headings properly
   - Keep sections organized
   - Maintain professional tone

## Next Steps

1. **Run the database migration** (`database-pages.sql`)
2. **Access the Pages section** in admin dashboard
3. **Review and customize** each page with your information
4. **Save and preview** changes before publishing
5. **Test** all three pages on your website

## Need Help?

Common questions:

**Q: Can I add more pages?**
A: Yes! You can extend this system to manage additional pages by adding new records to the database and creating corresponding frontend routes.

**Q: Can I use HTML instead of Markdown?**
A: The current system uses Markdown for simplicity and security. HTML support could be added but would require additional sanitization.

**Q: How do I change the page URLs?**
A: URLs are based on the `slug` field in the database. Don't change these without updating the corresponding route files.

**Q: Can I have different sections/fields for each page?**
A: Currently all pages share the same structure. Custom fields would require database schema changes.

Let me know if you need any additional features or modifications!
