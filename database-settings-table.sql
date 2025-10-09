-- Create settings table for general website configuration
-- This table stores contact information, social media links, logo, and favicon

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

-- Create social_media table for dynamic social media links
CREATE TABLE IF NOT EXISTS social_media (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings row (only one row should exist)
INSERT INTO settings (id, site_name, contact_email, contact_phone, contact_address)
VALUES (1, 'NextLink', 'info@nextlinkuae.com', '+971 50 123 4567', 'Dubai, UAE')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_media_order ON social_media(display_order);
