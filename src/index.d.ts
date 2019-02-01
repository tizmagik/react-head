import * as React from 'react';

/**
 * Context based provider for managing head tags
 */
export const HeadProvider: React.ComponentType<{
  headTags?: React.ReactElement<unknown>[];
}>;

/**
 * <title> tag component
 */
export const Title: React.ComponentType<React.HTMLAttributes<HTMLTitleElement>>;

/**
 * <style> tag component
 */
export const Style: React.ComponentType<React.HTMLAttributes<HTMLStyleElement>>;

/**
 * <meta> tag component
 */
export const Meta: React.ComponentType<React.HTMLAttributes<HTMLMetaElement>>;

/**
 * <link> tag component
 */
export const Link: React.ComponentType<React.HTMLAttributes<HTMLLinkElement>>;
