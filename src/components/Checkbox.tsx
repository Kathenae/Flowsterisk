
type CheckboxProps = {
   name?: string,
   checked?: boolean,
   onToggle?: () => void,
}

export default function Checkbox({name, checked, onToggle} : CheckboxProps){
   return (
      <div className="h-10 w-20 text-center relative border bg-white text-white rounded-md overflow-hidden cursor-pointer border-gray-400" onClick={() => onToggle && onToggle()}>
         <input type="hidden" name={name} checked={checked}/>
         <div className={`w-6 h-10 absolute top-0 transition-all duration-300 ${checked? "-right-6" : "right-15"}`}>
            <span className="absolute right-0 flex items-center justify-center -top-1.1 font-bold bg-brand-600 hover:bg-brand-700 h-11 w-26 z-0">
               <span className="mr-8">Yes</span>
            </span>
            <span className="absolute top-0 -left-4.5 rounded-md w-10 h-10 bg-light-100 hover:bg-gray-100 border-1 border-gray-400 z-10"/>
            <span className="absolute left-0 flex items-center justify-center -top-1.1 font-bold bg-gray-300 hover:bg-gray-400 h-11 w-22 z-0">
               <span className="ml-4">No</span>
            </span>
         </div>
      </div>
   )
}