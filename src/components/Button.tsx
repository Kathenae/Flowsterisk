import { PropsWithChildren } from "react";

type ButtonProps = { 
  className?: string, 
  draggable?: boolean,
  primary?: boolean, 
  full?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  onDragStart? : React.DragEventHandler<HTMLButtonElement>,
}

export default function Button({ children, primary, full, className, draggable, onClick, onDragStart }: PropsWithChildren<ButtonProps>) {

  const primaryClasses = "text-white !bg-green-400 shadow border-green-400 !hover:bg-green-500 !hover:border-green-500"

  return (
    <button 
      className={`p-2 bg-white hover:bg-green-200 hover:border-green-200 border-gray-800 border-1 rounded-lg ${full && "w-full"} ${primary && primaryClasses} ${className}`} 
      draggable={draggable} 
      onClick={onClick}
      onDragStart={onDragStart}
    >
      {children}
    </button>
  )
}