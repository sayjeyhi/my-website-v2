import { useCursorHandlers } from './Cursor.jsx'

export const Menu = props => {
  const { onSectionChange, menuOpened, setMenuOpened } = props
  const cursorHandlers = useCursorHandlers()

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-0 right-0 p-3 bg-primary w-12 h-12"
        {...cursorHandlers}>
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? 'rotate-45  translate-y-0.5' : ''
          }`}
        />
        <div className={`bg-white h-0.5 rounded-md w-full my-1 ${menuOpened ? 'hidden' : ''}`} />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? '-rotate-45' : ''
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-primary rounded-3xl transition-all overflow-hidden flex flex-col
      ${menuOpened ? 'w-80' : 'w-0'}`}>
        <div className="flex items-start justify-center flex-col gap-6 p-8">
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  )
}

const MenuButton = props => {
  const { label, onClick } = props
  const cursorHandlers = useCursorHandlers()

  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold text-white cursor-pointer hover:text-lime-950 transition-colors"
      {...cursorHandlers}>
      {label}
    </button>
  )
}
