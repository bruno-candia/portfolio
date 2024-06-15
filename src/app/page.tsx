import Button from '@/components/button'
import ModeToggle from '@/components/mode-toggle'

export default function Page() {
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
        <Button>Bruno</Button>
      </div>
      <div
        style={{ display: 'flex', alignSelf: 'center', marginTop: '24px' }}
      ></div>
    </div>
  )
}
