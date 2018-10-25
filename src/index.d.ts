import {
  ComponentType,
  HTMLAttributes,
  LinkHTMLAttributes,
  MetaHTMLAttributes,
  ReactElement,
  ReactNode,
  StyleHTMLAttributes,
} from 'react';

export type TitleProps = HTMLAttributes<HTMLTitleElement>;
export const Title: ComponentType<TitleProps>;

export type StyleProps = StyleHTMLAttributes<HTMLStyleElement>;
export const Style: ComponentType<StyleProps>;

export type MetaProps = MetaHTMLAttributes<HTMLMetaElement>;
export const Meta: ComponentType<MetaProps>;

export type LinkProps = LinkHTMLAttributes<HTMLLinkElement>;
export const Link: ComponentType<LinkProps>;

export type HeadTagElement = ReactElement<
  TitleProps | StyleProps | MetaProps | LinkProps
>;
export interface HeadProviderProps {
  readonly children: ReactNode;
  readonly headTags?: HeadTagElement[];
}
export const HeadProvider: ComponentType<HeadProviderProps>;
