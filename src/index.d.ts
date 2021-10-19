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


/**
 * <script> tag component
 * 
 * WARNING NOT FOR INJECTING CODE - use this for things like <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}/>
 */
 export const Script: React.ComponentType<
 React.ScriptHTMLAttributes<HTMLScriptElement>
>;

export type StaticNodeType = "script" | "style" | "tag" | string
export type StaticNode = {
  type: StaticNodeType
  name: string
  children ?: Array<StaticNode>
  attribs ?: Record<string, any>
}

/**
 * <Static> tag component for rendering pre-parsed static content to the head.  Useful for headless cms that return arbitrary content to inject into the head.
 *
 * WARNING : No attempt is made to de-duplicate tags provided by Static and those provided by <Meta> and <Title>
 */
 export const Static: React.ComponentType<{json:Array<StaticNode>}>

