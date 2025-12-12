#!/usr/bin/env node

/**
 * Helper script to create a new course note
 * Usage: node scripts/new-note.js "My Note Title"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get title from command line argument
const title = process.argv[2];

if (!title) {
  console.error('Error: Please provide a title');
  console.log('Usage: node scripts/new-note.js "My Note Title"');
  process.exit(1);
}

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

// Create filename
const filename = `${slug}.md`;
const filepath = path.join(__dirname, '..', 'content', 'courses', filename);

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`Error: File already exists: ${filename}`);
  process.exit(1);
}

// Create template content
const template = `---
title: "${title}"
description: "Add a brief description here"
level: "Beginner"
category: "Development"
order: 999
---

# ${title}

Start writing your course notes here...

## Section 1

Content for section 1.

## Resources

- [Link to resource](https://example.com)
`;

// Write file
try {
  fs.writeFileSync(filepath, template, 'utf8');
  console.log('✅ Created new course note:');
  console.log(`   File: content/courses/${filename}`);
  console.log(`   URL:  /courses/${slug}`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Edit the frontmatter (description, level, category, order)');
  console.log('   2. Write your content');
  console.log('   3. Restart the dev server to see changes');
} catch (error) {
  console.error('Error creating file:', error.message);
  process.exit(1);
}
