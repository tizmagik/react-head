import * as React from 'react';

/**
 * Context based provider for managing head tags
 */
export const HeadProvider: React.ComponentType<{
  headTags?: React.ReactElement<unknown>[];
}>;

type HeadTagProps = {name?: string, content?: string};
/**
 * <title> tag component
 */
export const Title: React.ComponentType<React.HTMLAttributes<HTMLTitleElement> & HeadTagProps>;

/**
 * <style> tag component
 */
export const Style: React.ComponentType<React.HTMLAttributes<HTMLStyleElement> & HeadTagProps>;

/**
 * <meta> tag component
 */
export const Meta: React.ComponentType<React.HTMLAttributes<HTMLMetaElement> & HeadTagProps>;

/**
 * <link> tag component
 */
export const Link: React.ComponentType<React.HTMLAttributes<HTMLLinkElement> & HeadTagProps>;

