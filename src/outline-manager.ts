import styles from './App.module.css'

function outlineOnWithTab(event: KeyboardEvent): void {
  onTab(event, () => setOutline(true))
  window.addEventListener('mousedown', outlineOffWithClick)
  window.removeEventListener('keydown', outlineOnWithTab)
}

function outlineOffWithClick(event: MouseEvent): void {
  onClick(event, () => setOutline(false))
  window.removeEventListener('mousedown', outlineOffWithClick)
  window.addEventListener('keydown', outlineOnWithTab)
}

function onTab(event: KeyboardEvent, cb: () => void): void {
  if (event.key === "Tab") cb()
}

function onClick(event: MouseEvent, cb: () => void): void {
  if (event.button === 0) cb()
}

function setOutline(value: boolean) {
  if (value === false) {
    document.body.classList.add(styles.outlineOff)
  } else {
    document.body.classList.remove(styles.outlineOff)
  }
}

export function start() {
  setOutline(false)
  window.addEventListener('keydown', outlineOnWithTab)
}