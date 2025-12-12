# Course Notes

This directory contains markdown files for course notes that are automatically rendered on the website.

## How to Add a New Course Note

1. Create a new `.md` file in `content/courses/`
2. Add frontmatter at the top with metadata
3. Write your content in Markdown
4. The note will automatically appear on `/courses`

## File Naming

Use kebab-case for filenames: `my-course-note.md`

The filename becomes the URL slug: `/courses/my-course-note`

## Frontmatter Format

Every course note should start with frontmatter:

```markdown
---
title: "Your Course Title"
description: "A brief description of what this note covers"
level: "Beginner|Intermediate|Advanced|High-Level"
category: "AI Development|Web Development|etc"
order: 1
---
```

### Required Fields

- `title`: Display title
- `description`: Short summary (used in card previews and meta tags)

### Optional Fields

- `level`: Difficulty level (appears as a badge)
- `category`: Topic category (appears as a badge)
- `order`: Controls sort order (lower numbers appear first, default is 999)

## Markdown Features

All standard markdown is supported, plus:

### Code Blocks

\`\`\`typescript
const example = "Code with syntax highlighting";
\`\`\`

### Tables (GitHub Flavored Markdown)

| Column 1 | Column 2 |
| -------- | -------- |
| Data     | Data     |

### Auto-linked Headings

Headings automatically get anchor links for easy sharing.

### Inline Code

Use \`backticks\` for inline code.

### Lists

- Bullet lists
- Work great

1. Numbered lists
2. Also supported

### Blockquotes

> Important notes can be highlighted

### Links

[Link text](https://example.com) - opens in new tab automatically

## Best Practices

1. **Use descriptive titles**: Make it clear what the note covers
2. **Start with an overview**: Begin with a summary of what readers will learn
3. **Break into sections**: Use headings to organize content
4. **Include examples**: Code examples help clarify concepts
5. **Add resources**: Link to related materials at the end
6. **Keep order logical**: Use the `order` field to sequence related notes

## Example Note

```markdown
---
title: "Getting Started with React Hooks"
description: "Learn the fundamentals of React Hooks including useState and useEffect"
level: "Beginner"
category: "Web Development"
order: 1
---

# Getting Started with React Hooks

React Hooks let you use state and other React features without writing a class.

## useState

The \`useState\` hook lets you add state to function components:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
const [count, setCount] = useState(0);

return (
<button onClick={() => setCount(count + 1)}>
Count: {count}
</button>
);
}
\`\`\`

## Resources

- [React Hooks Documentation](https://react.dev/reference/react)
```

## Performance

- All notes are statically generated at build time
- Fast page loads with Next.js optimization
- Syntax highlighting is applied server-side
- Markdown parsing uses optimized libraries

## Development

After adding or editing notes, restart the dev server to see changes:

```bash
npm run dev
```

For production builds:

```bash
npm run build
```
