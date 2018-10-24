declare module 'react-head' {
  import {
    ReactElement,
    ReactNode,
    HTMLAttributes,
    StyleHTMLAttributes,
    MetaHTMLAttributes,
    LinkHTMLAttributes,
  } from 'react';

  export type TitleProps = HTMLAttributes<HTMLTitleElement>;

  export function Title(props: TitleProps): ReactElement<TitleProps>;

  export type StyleProps = StyleHTMLAttributes<HTMLStyleElement>;

  export function Style(props: StyleProps): ReactElement<StyleProps>;

  export type MetaProps = MetaHTMLAttributes<HTMLMetaElement>;

  export function Meta(props: MetaProps): ReactElement<MetaProps>;

  export type LinkProps = LinkHTMLAttributes<HTMLLinkElement>;

  export function Link(props: LinkProps): ReactElement<LinkProps>;

  export type HeadTagElement = ReactElement<
    TitleProps | StyleProps | MetaProps | LinkProps
  >;

  export interface HeadProviderProps {
    readonly children: ReactNode;
    readonly headTags?: HeadTagElement[];
  }

  export function HeadProvider(
    props: HeadProviderProps
  ): ReactElement<HeadProviderProps>;
}
