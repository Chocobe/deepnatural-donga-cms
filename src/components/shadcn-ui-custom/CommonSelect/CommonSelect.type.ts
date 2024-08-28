export type TCommonSelectOption<
  TText extends string = string,
  TValue extends string = string
> = {
  text: TText;
  value: TValue;
};
