import * as React from 'react';

/**
 * Context based provider for managing head tags
 */
export const HeadProvider: React.ComponentType<{
  headTags?: React.ReactElement<unknown>[];
  children?: React.ReactNode | undefined
}>;

/**
 * <title> tag component
 */
export const Title: React.ComponentType<React.HTMLAttributes<HTMLTitleElement>>;

/**
 * <style> tag component
 */
export const Style: React.ComponentType<
  React.StyleHTMLAttributes<HTMLStyleElement>
>;

/**
 * <meta> tag component
 */
export const Meta: React.ComponentType<
  React.MetaHTMLAttributes<HTMLMetaElement>
>;

/**
 * <link> tag component
 */
export const Link: React.ComponentType<
  React.LinkHTMLAttributes<HTMLLinkElement>
>;

/**
 * <base> tag component
 */
export const Base: React.ComponentType<
  React.BaseHTMLAttributes<HTMLBaseElement>
>;
