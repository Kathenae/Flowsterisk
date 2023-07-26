type InputProps = {
   type: "text" | "number" | "password" | "email",
   name?: string,
   className?: string,
   value?: string | number,
   placeholder?: string,
   onChange?: (event : React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Input({ type, name, value, placeholder, onChange, className }: InputProps) {

  return (
     <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="none"
        className={`block w-full p-2 border-1 focus:outline-green-400 rounded-md ${className}`}
     />
  )
}