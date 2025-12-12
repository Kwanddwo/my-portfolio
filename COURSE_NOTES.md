# Course Notes System

A high-performance, Markdown-based course notes system inspired by Steve Kinney's website.

## Features

✅ **Optimized Performance**

- Static site generation (SSG) for instant page loads
- Server-side markdown rendering
- Automatic code syntax highlighting
- Minimal client-side JavaScript

✅ **Developer Friendly**

- Simple markdown files in `content/courses/`
- Frontmatter for metadata
- GitHub Flavored Markdown support
- Auto-generated navigation

✅ **SEO Optimized**

- Automatic meta tags from frontmatter
- Semantic HTML structure
- Auto-linked headings
- Clean URLs

✅ **Great UX**

- Responsive design
- Dark mode support
- Search-friendly heading anchors
- Mobile-optimized reading experience

## Architecture

### Directory Structure

```
content/
  courses/
    *.md                          # Course note markdown files

app/
  courses/
    page.tsx                       # Course listing page
    [slug]/
      page.tsx                     # Dynamic course note page
      not-found.tsx                # 404 page for missing notes

lib/
  course-notes.ts                  # Markdown parsing utilities

components/
  quick-reference.tsx              # Optional component for notes
```

### Data Flow

1. **Build Time**:

   - `getAllCourseNoteSlugs()` reads all `.md` files
   - Next.js generates static pages for each slug
   - Markdown is parsed and rendered to HTML
   - Syntax highlighting applied server-side

2. **Runtime**:
   - Users navigate to `/courses`
   - See list of all course notes (from static data)
   - Click to view individual note
   - Instant page load (pre-rendered HTML)

### Key Technologies

- **next-mdx-remote**: Server-side MDX rendering
- **gray-matter**: Frontmatter parsing
- **remark-gfm**: GitHub Flavored Markdown support
- **rehype-highlight**: Code syntax highlighting
- **rehype-slug**: Auto-generate heading IDs
- **rehype-autolink-headings**: Auto-link headings

## Performance Optimizations

### 1. Static Site Generation

All course notes are pre-rendered at build time:

```typescript
export async function generateStaticParams() {
  const slugs = getAllCourseNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

**Result**: Zero server processing at runtime

### 2. Efficient Markdown Processing

Only parse content when needed:

```typescript
// Listing page - metadata only (no content parsing)
export function getAllCourseNotes(): CourseNoteMeta[] {
  // Only reads frontmatter, skips content
}

// Detail page - full content
export function getCourseNoteBySlug(slug: string): CourseNote | null {
  // Parses full markdown content
}
```

### 3. Code Highlighting

Syntax highlighting happens server-side via rehype-highlight:

- No client-side JavaScript needed
- Smaller bundle size
- Faster initial render
- Works without JavaScript enabled

### 4. Optimized Images

When adding images to course notes:

```markdown
![Alt text](/images/diagram.png)
```

Next.js automatically optimizes images via the Image component.

## Adding Course Notes

### Step 1: Create Markdown File

Create `content/courses/my-note.md`:

```markdown
---
title: "My Course Note"
description: "Learn about something interesting"
level: "Intermediate"
category: "Development"
order: 10
---

# My Course Note

Your content here...
```

### Step 2: Build/Dev

```bash
# Development
npm run dev

# Production build
npm run build
```

The note automatically appears at `/courses/my-note`

## Customization

### Styling MDX Components

Edit `app/courses/[slug]/page.tsx` to customize how markdown renders:

```typescript
const components = {
  h1: (props: any) => <h1 className="custom-styles" {...props} />,
  // ... other components
};
```

### Adding Custom Components

1. Create component in `components/`
2. Import in the MDX options
3. Use in markdown:

```markdown
<CustomComponent prop="value" />
```

### Changing Syntax Theme

Edit the highlight.js theme import in `app/courses/[slug]/page.tsx`:

```typescript
import "highlight.js/styles/github-dark.css"; // Change this
```

Available themes: https://highlightjs.org/static/demo/

## SEO Configuration

Metadata is automatically generated from frontmatter:

```typescript
export async function generateMetadata({ params }) {
  const note = getCourseNoteBySlug(params.slug);
  return {
    title: `${note.title} | Course Notes`,
    description: note.description,
  };
}
```

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Or connect GitHub repo for automatic deployments
```

### Other Platforms

1. Build the site: `npm run build`
2. Deploy the `.next` folder
3. Ensure Node.js runtime is available

## Maintenance

### Adding New Notes

Just create new `.md` files - no code changes needed!

### Updating Existing Notes

Edit the `.md` file and redeploy. Static pages regenerate automatically.

### Deleting Notes

1. Delete the `.md` file
2. Rebuild/redeploy
3. The page is automatically removed

## Future Enhancements

Possible additions:

- [ ] Search functionality
- [ ] Table of contents generation
- [ ] Reading time estimates
- [ ] Tags/filtering
- [ ] Related notes suggestions
- [ ] Code copy buttons
- [ ] Comments section
- [ ] Analytics integration

## Troubleshooting

### Notes don't appear

- Check file is in `content/courses/`
- Verify `.md` extension
- Ensure valid frontmatter
- Restart dev server

### Styling looks wrong

- Check Tailwind CSS is configured
- Verify component imports
- Check dark mode settings

### Build fails

- Validate all markdown syntax
- Check for missing dependencies
- Review console errors

## Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [MDX Documentation](https://mdxjs.com/)
- [Remark/Rehype Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [Markdown Guide](https://www.markdownguide.org/)
