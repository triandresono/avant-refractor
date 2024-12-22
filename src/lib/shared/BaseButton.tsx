import { Button } from 'antd'
import { ButtonType } from 'antd/es/button'
import React, { ReactNode } from 'react'

type BaseButtonType = {
  type: ButtonType | 'netral' | 'secondary' | 'primary-ghost' | 'transparent' | 'tertiary' | undefined
  id?: string
  children?: ReactNode
  disabled?: boolean
  className?: string
  onClick?: React.MouseEventHandler
  loading?: boolean
  height?: string
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  style?: React.CSSProperties | undefined
  form?: string
  icon?: ReactNode | undefined
  hidden?: boolean | undefined
}

const BaseButton = ({
  id,
  children,
  disabled = false,
  type = 'primary',
  className = '',
  onClick,
  loading = false,
  height = '48px',
  htmlType = 'button',
  style,
  form,
  hidden = false,
  ...props
}: BaseButtonType) => {
  const randomId = Math.floor(Math.random() * 1000 + 1)
  const bg = disabled && type !== 'link' ? 'bg-grey-1' : ''
  return (
    <Button
      form={form}
      id={`button-${id || randomId}`}
      name={`button-${id || randomId}`}
      onClick={onClick}
      // @ts-expect-error because netral & secondary is not in ButtonType antd types
      type={type}
      loading={loading}
      disabled={disabled}
      hidden={hidden}
      htmlType={htmlType}
      className={`custom-button custom-button-${
        disabled ? 'disabled' : type
      } ${bg} flex items-center justify-center font-grotesk ${className}`}
      style={{ height: height, ...style }}
      {...props}>
      {children}
    </Button>
  )
}

export default React.memo(BaseButton)
