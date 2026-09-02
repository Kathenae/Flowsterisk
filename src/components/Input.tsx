type InputProps = {
   type: "text" | "number" | "password" | "email",
   name?: string,
   className?: string,
   value?: string | number,
   placeholder?: string,
   onChange?: (event : React.ChangeEvent<HTMLInputElement>) => void,
   disabled?: boolean,
}

export default function Input({ type, name, value, placeholder, onChange, className, disabled }: InputProps) {

  return (
     <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        autoComplete="none"
        className={`block w-full p-2 border-1 focus:outline-brand-400 rounded-md !dark:bg-dark-400 dark:border-dark-100 dark:focus:outline-dark-400 ${className}`}
     />
  )
}