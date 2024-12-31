import type { BoxProps, InputElementProps } from "@chakra-ui/react";
import { Group, InputElement } from "@chakra-ui/react";
import * as React from "react";

export interface InputGroupProps extends BoxProps {
  startElementProps?: InputElementProps;
  endElementProps?: InputElementProps;
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  children: React.ReactElement;
  startOffset?: InputElementProps["paddingStart"];
  endOffset?: InputElementProps["paddingEnd"];
}

/**
 * InputGroup is a compound component that combines an input with optional start and end elements.
 * It's commonly used to create input fields with icons, buttons, or other decorative elements.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.startElement - Element to render at the start of input (e.g. search icon)
 * @param {InputElementProps} props.startElementProps - Props for the start element wrapper
 * @param {React.ReactNode} props.endElement - Element to render at the end of input (e.g. clear button)
 * @param {InputElementProps} props.endElementProps - Props for the end element wrapper
 * @param {React.ReactElement} props.children - Single child element (must be an input component)
 * @param {string} props.startOffset - Padding offset for start element (default: "6px")
 * @param {string} props.endOffset - Padding offset for end element (default: "6px")
 */
export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    {
      startElement,
      startElementProps,
      endElement,
      endElementProps,
      children,
      startOffset = "6px",
      endOffset = "6px",
      ...rest
    }: InputGroupProps,
    ref
  ) {
    // Ensures children prop contains exactly one React element
    // React.Children.only() throws if multiple children are provided
    // The child element must implement InputElementProps interface
    // This type assertion is safe because children is typed in InputGroupProps
    const child = React.Children.only(
      children
    ) as React.ReactElement<InputElementProps>;

    return (
      <Group ref={ref} {...rest}>
        {/* Render start element (e.g. icon) if provided */}
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}

        {/* Clone and modify the input child element with proper padding based on start/end elements */}
        {React.cloneElement(child, {
          // Add padding-start if there's a start element
          ...(startElement && {
            ps: `calc(var(--input-height) - ${startOffset})`,
          }),
          // Add padding-end if there's an end element
          ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
          // Preserve original child props
          ...child.props,
        })}

        {/* Render end element if provided */}
        {endElement && (
          <InputElement placement="end" {...endElementProps}>
            {endElement}
          </InputElement>
        )}
      </Group>
    );
  }
);
