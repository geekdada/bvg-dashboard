import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CSS_CLASSES } from '@/lib/config'

interface BVGButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary'
}

export function BVGButton({ 
  className, 
  variant = 'primary', 
  size = 'sm',
  ...props 
}: BVGButtonProps) {
  const variantClasses = {
    primary: CSS_CLASSES.button.primary,
    secondary: 'bg-bvg-yellow text-black hover:bg-yellow-400',
  }

  return (
    <Button
      variant="outline"
      size={size}
      className={cn(
        'h-8 text-xs sm:text-sm px-2 sm:px-3',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}