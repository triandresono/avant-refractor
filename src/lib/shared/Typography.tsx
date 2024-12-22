import { Typography } from 'antd'
import { ReactNode } from 'react'

type TypographyType = {
  children: ReactNode
  className?: string
}

const Paragraph = ({ children, className }: TypographyType) => (
  <Typography.Paragraph className={className}>{children}</Typography.Paragraph>
)

const Text = ({ children, className }: TypographyType) => (
  <Typography.Text className={className}>{children}</Typography.Text>
)

const Title = ({ children, className }: TypographyType) => (
  <Typography.Title className={className}>{children}</Typography.Title>
)

const Link = ({ children, className }: TypographyType) => (
  <Typography.Link className={className}>{children}</Typography.Link>
)

export { Link, Paragraph, Text, Title }
