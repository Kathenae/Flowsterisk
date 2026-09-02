import { PropsWithChildren } from "react";

type ButtonProps = { 
  className?: string, 
  draggable?: boolean,
  primary?: boolean,
  danger?: boolean, 
  full?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  onDragStart? : React.DragEventHandler<HTMLButtonElement>,
  type?: "button" | "submit" | "reset",
  disabled?: boolean,
}

export default function Button({ children, primary, danger, full, className, draggable, onClick, onDragStart, type = "button", disabled }: PropsWithChildren<ButtonProps>) {

  const primaryClasses = "text-white !bg-brand-400 shadow !border-brand-400 !hover:bg-brand-500 !hover:border-brand-500"
  const dangerClasses = "text-white !bg-red-400 shadow border-red-400 !hover:bg-red-500 !hover:border-red-500"

  return (
    <button 
      type={type}
      className={`p-2 bg-white text-gray-600 !dark:text-gray-100 dark:bg-dark-200 hover:bg-brand-200 hover:border-brand-200 border-gray-300 dark:border-dark-100 border-1 rounded-lg ${full && "w-full"} ${primary && primaryClasses} ${danger && dangerClasses} ${className}`} 
      draggable={draggable} 
      onClick={onClick}
      onDragStart={onDragStart}
      disabled={disabled}
    >
      {children}
    </button>
  )
}