import clsx from 'clsx'
import styles from './styles.module.css'

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  width?: string
  height?: string
}

function Skeleton({ className, width, height, ...props }: ISkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={clsx(styles.skeletonLoader, className)}
      {...props}
    />
  )
}

export { Skeleton }
