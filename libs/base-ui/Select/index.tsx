import { forwardRef } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import classnames from 'classnames';

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item className={classnames('SelectItem', className)} {...props} ref={ref}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

// POC select to test if base-ui works for apps/bridge and apps/web
// will be removed in the next PR
function Select() {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger className="SelectTrigger" aria-label="Food">
        <SelectPrimitive.Value placeholder="Select a fruit…" />
        <SelectPrimitive.Icon className="SelectIcon">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="SelectContent">
          <SelectPrimitive.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="SelectViewport">
            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="SelectLabel">Fruits</SelectPrimitive.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator className="SelectSeparator" />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="SelectLabel">Vegetables</SelectPrimitive.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator className="SelectSeparator" />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="SelectLabel">Meat</SelectPrimitive.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
