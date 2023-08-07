import * as THREE from 'three'
import Experience from '../Experience.js'
import GSAP from 'gsap'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene
    this.roomChildren = {}

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    }

    this.light = new THREE.PointLight(0xffffff, 0, 5)
    this.light.position.set(
      0.7122382521629333,
      0.9004801511764526,
      -0.44226258993148804
    )

    this.tvOnMaterial = new THREE.MeshBasicMaterial({
      map: this.resources.items.tv_screen,
    })

    this.tvOffMaterial = new THREE.MeshBasicMaterial({
      map: null,
      color: 0x000000,
    })

    this.tvScreen = null

    this.setModel()
    this.onMouseMove()
  }

  toggleDark(theme) {
    if (theme === 'dark') {
      this.tvScreen.material = this.tvOnMaterial
      this.light.intensity = 1
    } else {
      this.tvScreen.material = this.tvOffMaterial
      this.light.intensity = 0
    }
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          //   console.log(groupchild.material)
          groupchild.castShadow = true
          groupchild.receiveShadow = true
        })
      }

      if (child.name === 'Laptop') {
        child.children[3].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.laptop,
        })
      }

      if (child.name === 'Wall_Accessories') {
        this.tvScreen = child.children[2]
        this.tvScreen.material = new THREE.MeshBasicMaterial({
          color: 0x000000,
        })
      }

      if (child.name === 'Mini_Plane') {
        child.position.x = 0.035962
        child.position.z = 0.598564
      }

      child.scale.set(0, 0, 0)

      this.roomChildren[child.name.toLowerCase()] = child
    })

    this.actualRoom.add(this.light)
    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(1, 1, 1)
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.05
    })
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )

    this.actualRoom.rotation.y = this.lerp.current
  }
}
