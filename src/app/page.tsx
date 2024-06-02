'use client'
import { Button } from '@/components/button'
import astronaut from '../../public/astronaut.png'
import astronautDark from '../../public/astronaut_dark.png'
import ModeToggle from '@/components/mode-toggle'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Page() {
  const { theme } = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ModeToggle />
        <Button variant="default" size="normal">
          Button
        </Button>
      </div>
      <div style={{ display: 'flex', alignSelf: 'center', marginTop: '24px' }}>
        {theme === 'light' ? (
          <Image
            src={astronautDark}
            alt={'Hand draw light astronaut'}
            width={200}
            height={200}
            priority
          />
        ) : (
          <Image
            src={astronaut}
            alt={'Hand draw dark astronaut'}
            width={200}
            height={200}
            priority
          />
        )}
      </div>
    </div>
  )
}
