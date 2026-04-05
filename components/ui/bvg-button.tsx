import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BVGButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'default' | 'destructive'
}

export function BVGButton({
  className,
  variant = 'primary',
  size = 'sm',
  ...props
}: BVGButtonProps) {
  if (variant === 'primary') {
    return (
      <Button
        variant="default"
        size={size}
        className={cn('h-9 text-xs sm:text-sm font-medium', className)}
        {...props}
      />
    )
  }

  return (
    <Button
      variant={variant as any}
      size={size}
      className={cn('h-9 text-xs sm:text-sm font-medium', className)}
      {...props}
    />
  )
}