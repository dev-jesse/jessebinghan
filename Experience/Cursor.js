import GSAP from 'gsap'

export default class Cursor {
  constructor() {
    this.setupCursor()
  }

  setupCursor() {
    let cursor = document.querySelector('.cursor')
    let follower = document.querySelector('.cursor-follower')

    let posX = 0
    let posY = 0

    let mouseX = 0
    let mouseY = 0

    GSAP.to(
      {},
      {
        duration: 0.016,
        repeat: -1,
        onRepeat: function () {
          posX += (mouseX - posX) / 9
          posY += (mouseY - posY) / 9

          GSAP.set(follower, {
            css: {
              left: posX - 12,
              top: posY - 12,
            },
          })

          GSAP.set(cursor, {
            css: {
              left: mouseX,
              top: mouseY,
            },
          })
        },
      }
    )

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    document.querySelector('.link-item').addEventListener('mouseenter', () => {
      cursor.classList.add('active')
      follower.classList.add('active')
    })
    document.querySelector('.link-item').addEventListener('mouseleave', () => {
      cursor.classList.remove('active')
      follower.classList.remove('active')
    })
  }
}
