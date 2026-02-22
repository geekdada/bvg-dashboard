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
  // Map our custom 'primary' to Shadcn's button with the custom bvg-btn-outline class
  if (variant === 'primary') {
    return (
      <Button
        variant="outline"
        size={size}
        className={cn('h-8 text-xs sm:text-sm font-medium bvg-btn-outline', className)}
        {...props}
      />
    )
  }

  return (
    <Button
      variant={variant as any}
      size={size}
      className={cn('h-8 text-xs sm:text-sm font-medium shadow-sm', className)}
      {...props}
    />
  )
}