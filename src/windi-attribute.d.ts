import { AriaAttributes, DOMAttributes } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    font?: string;
    text?: string;
    underline?: string;
    list?: string;
    bg?: string;
    gradient?: string;
    border?: string;
    divide?: string;
    ring?: string;
    icon?: string;
    container?: string;
    p?: string;
    m?: string;
    space?: string;
    w?: string;
    'min-w'?: string;
    'max-w'?: string;
    h?: string;
    'min-h'?: string;
    'max-h'?: string;
    flex?: string;
    gap?: string;
    grid?: string;
    table?: string;
    order?: string;
    align?: string;
    justify?: string;
    place?: string;
    display?: string;
    position?: string;
    box?: string;
    caret?: string;
    isolation?: string;
    object?: string;
    overflow?: string;
    overscroll?: string;
    z?: string;
    shadow?: string;
    opacity?: string;
    blend?: string;
    filter?: string;
    backdrop?: string;
    transition?: string;
    animate?: string;
    transform?: string;
    appearance?: string;
    cursor?: string;
    outline?: string;
    pointer?: string;
    resize?: string;
    select?: string;
    selection?: string;
    sr?: string;
  }
}
