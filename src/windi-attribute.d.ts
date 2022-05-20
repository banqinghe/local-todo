import { AriaAttributes, DOMAttributes } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'max-h'?: string;
    'max-w'?: string;
    'min-h'?: string;
    'min-w'?: string;
    align?: string;
    animate?: string;
    appearance?: string;
    backdrop?: string;
    bg?: string;
    blend?: string;
    border?: string;
    box?: string;
    caret?: string;
    container?: string;
    cursor?: string;
    display?: string;
    divide?: string;
    filter?: string;
    flex?: string;
    font?: string;
    gap?: string;
    gradient?: string;
    grid?: string;
    h?: string;
    icon?: string;
    isolation?: string;
    justify?: string;
    list?: string;
    m?: string;
    object?: string;
    opacity?: string;
    order?: string;
    outline?: string;
    overflow?: string;
    overscroll?: string;
    p?: string;
    place?: string;
    pointer?: string;
    position?: string;
    resize?: string;
    ring?: string;
    select?: string;
    selection?: string;
    shadow?: string;
    space?: string;
    sr?: string;
    table?: string;
    text?: string;
    transform?: string;
    transition?: string;
    underline?: string;
    w?: string;
    z?: string;
  }
}
