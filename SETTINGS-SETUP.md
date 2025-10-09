# Settings Feature Setup Guide

A new General Settings section has been added to your admin dashboard where you can manage website settings, contact information, and social media links.

## Database Setup

Run the SQL script in `database-settings-table.sql` to create the required tables:

```sql
-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(255) DEFAULT 'NextLink',
    logo_url TEXT,
    favicon_url TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create social_media table
CREATE TABLE IF NOT EXISTS social_media (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (id, site_name, contact_email, contact_phone, contact_address)
VALUES (1, 'NextLink', 'info@nextlinkuae.com', '+971 50 123 4567', 'Dubai, UAE')
ON CONFLICT (id) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_social_media_order ON social_media(display_order);
```

## Features

### 1. Site Information
- **Site Name**: Update your website name
- **Logo URL**: Add or change your logo (displayed in navbar and footer)
- **Favicon URL**: Custom favicon for browser tabs

### 2. Contact Information
- **Email**: Company email address
- **Phone**: Contact phone number
- **Address**: Physical or business address

All contact information is displayed in the website footer. If a field is empty, it won't be shown to visitors.

### 3. Social Media Links
- Add unlimited social media profiles
- Choose from popular platforms:
  - Facebook
  - Twitter
  - Instagram
  - LinkedIn
  - YouTube
  - TikTok
  - WhatsApp
  - GitHub
  - Dribbble
  - Behance
- Icons automatically match the platform
- Control display order
- Only shows links you've added (empty = hidden)

## How to Use

### Access Settings
1. Log in to admin dashboard at `https://nextlinkuae.com/admin`
2. Click "Settings" in the sidebar navigation
3. The Settings page has three sections:
   - Site Information
   - Contact Information
   - Social Media Links

### Update Site & Contact Information
1. Fill in or update any fields
2. Leave fields empty if you don't want them displayed
3. Click "Save Settings" at the bottom
4. Changes appear immediately on your website

### Manage Social Media Links

**Add a new social media link:**
1. Click "Add Social Media" button
2. Select the platform from dropdown
3. Enter the full URL (e.g., `https://facebook.com/yourpage`)
4. Set display order (lower numbers appear first)
5. Click "Add"

**Edit existing link:**
1. Click the edit icon (pencil) next to any social media link
2. Update the URL or display order
3. Click "Update"

**Delete a link:**
1. Click the delete icon (trash) next to any social media link
2. Confirm deletion

### Logo and Favicon Guidelines

**Logo:**
- Recommended size: 200x50px
- Formats: PNG or SVG
- Use transparent background for best results
- Will display in navbar and footer

**Favicon:**
- Recommended size: 32x32px or 64x64px
- Formats: ICO or PNG
- Square images work best
- Shows in browser tab next to page title

## API Endpoints

The following API endpoints are available:

### Settings
- `GET /api/settings` - Get current settings
- `PUT /api/settings` - Update settings

### Social Media
- `GET /api/social-media` - Get all social media links
- `POST /api/social-media` - Create new social media link
- `PUT /api/social-media/[id]` - Update social media link
- `DELETE /api/social-media/[id]` - Delete social media link

## Technical Details

- Settings are stored in PostgreSQL database
- Changes are reflected immediately across the website
- Footer component dynamically loads settings on each page
- Favicon updates automatically when changed
- Social media icons use Lucide React icon library
- All fields are optional - only filled fields are displayed

## Troubleshooting

**Settings not saving:**
- Check database connection
- Verify `settings` and `social_media` tables exist
- Check browser console for errors

**Favicon not updating:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try using a different browser
- Ensure favicon URL is publicly accessible

**Social media icons not showing:**
- Verify the URL is complete and correct
- Check that you selected a platform (icon is assigned automatically)
- Refresh the page

**Contact info not appearing in footer:**
- Ensure fields are filled in Settings page
- Click "Save Settings" after making changes
- Check that fields are not empty in database

## Notes

- Only ONE settings record exists (id = 1)
- You can add unlimited social media links
- Empty fields won't display on the website
- All URLs should include `https://` or `http://`
- Display order can be any number (lower = displayed first)
