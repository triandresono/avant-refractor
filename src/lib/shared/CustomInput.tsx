import { Input, InputProps } from 'antd'
import { ReactNode, ChangeEvent } from 'react'

interface CustomInputType extends InputProps {
  id?: string
  value?: string | number | readonly string[]
  placeholder: string
  className?: string
  type?: string
  prefix?: ReactNode
  disabled?: boolean
  autoFocus?: boolean
  required?: boolean
  name?: string
  isRead?: boolean
  validator?: (value: string) => string | undefined // Custom validator
}

const CustomInput: React.FC<CustomInputType> = ({
  id,
  value,
  placeholder,
  className = '',
  type,
  prefix,
  disabled = false,
  autoFocus = false,
  isRead = false,
  validator,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (validator) {
      const validationError = validator(newValue);
      if (validationError) {
        // Handle error, bisa menggunakan state atau mekanisme lain untuk menampilkan error
        console.log(validationError); // Misalnya log ke console
      }
    }
  }

  return (
    <Input
      id={id}
      placeholder={isRead && !value ? '' : placeholder}
      type={type}
      value={value}
      prefix={prefix}
      className={`custom-input ${
        disabled ? 'custom-input-disabled' : ''
      } h-12 px-4 py-[14px] ${className}`}
      disabled={disabled}
      autoFocus={autoFocus}
      onChange={handleChange} // Menangani perubahan input
      {...props}
    />
  )
}

export default CustomInput
