# Browser Caching Strategy

## Overview
This website implements a comprehensive browser caching strategy to improve performance and reduce server load for repeat visitors.

## Cache Configuration

### Vercel (Primary Hosting)
Configuration in `vercel.json`:

- **Images** (`/images/*`): 1 year cache, immutable
- **Minified CSS** (`*.min.css`): 1 year cache, immutable
- **Regular CSS** (`*.css`): 30 days cache
- **JavaScript** (`*.js`): 30 days cache
- **Favicons & Manifest**: 1 year cache, immutable
- **HTML Pages**: 1 hour cache with revalidation

### Apache (.htaccess fallback)
Backup configuration for non-Vercel hosting with similar cache durations.

## Cache Durations Explained

### Long-term Caching (1 year)
- **Images**: WebP, PNG, JPG files rarely change
- **Minified CSS**: Version-controlled through filename changes
- **Favicons**: Almost never change

### Medium-term Caching (30 days)
- **Regular CSS**: May be updated during development
- **JavaScript**: Updated with new features

### Short-term Caching (1 hour)
- **HTML**: Content updates regularly, but still cacheable

## Benefits

1. **Faster Load Times**: Static assets cached locally
2. **Reduced Bandwidth**: Fewer server requests
3. **Better User Experience**: Near-instant page loads for return visitors
4. **Lower Server Load**: Reduced resource consumption

## Cache Busting

When updating cached files:
- **CSS**: Use versioned filenames (e.g., `style-v2.min.css`)
- **Images**: Rename files if content changes
- **HTML**: Short cache ensures quick updates

## Testing

Use browser dev tools Network tab to verify:
- First visit: Files loaded from server
- Repeat visit: Files loaded from cache (200 cached/304 Not Modified)

## Browser Support

This configuration works with all modern browsers and follows standard HTTP caching practices.