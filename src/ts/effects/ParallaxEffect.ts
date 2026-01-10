import gsap from 'gsap';

export class ParallaxEffect {
  private section: HTMLElement;
  private layers: NodeListOf<HTMLElement> | null = null;
  private isMobile: boolean = false;
  private permissionGranted: boolean = false;

  constructor(section: HTMLElement) {
    this.section = section;
    this.checkMobile();
    window.addEventListener('resize', () => this.enable());
  }

  public setLayers(layers: NodeListOf<HTMLElement> | null) {
    this.layers = layers;
  }

  public enable() {
    this.checkMobile();
    if (this.isMobile) {
      if (this.permissionGranted || typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
         this.enableMobile();
      } else {
         this.addGlobalPermissionListeners();
      }
    } else {
      this.enableDesktop();
    }
  }

  public async requestMobilePermission(): Promise<boolean> {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const state = await (DeviceOrientationEvent as any).requestPermission();
        if (state === 'granted') {
          this.permissionGranted = true;
          this.enableMobile();
          return true;
        }
        return false;
      } catch (e) {
        console.error('Parallax permission error:', e);
        return false;
      }
    } else {
      this.permissionGranted = true;
      this.enableMobile();
      return true;
    }
  }

  private enableDesktop() {
    window.removeEventListener('deviceorientation', this.onDeviceOrientationBinder);
    this.section.removeEventListener('mousemove', this.onMouseMoveBinder);
    this.section.addEventListener('mousemove', this.onMouseMoveBinder);
  }

  private onDeviceOrientationBinder = this.onDeviceOrientation.bind(this);
  private onMouseMoveBinder = this.onMouseMove.bind(this);

  private enableMobile() {
    this.section.removeEventListener('mousemove', this.onMouseMoveBinder);
    window.removeEventListener('deviceorientation', this.onDeviceOrientationBinder);
    window.addEventListener('deviceorientation', this.onDeviceOrientationBinder);
  }

  private onMouseMove(e: MouseEvent) {
    if (this.isMobile || !this.layers) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    this.applyParallax(x, y);
  }

  private onDeviceOrientation(e: DeviceOrientationEvent) {
    if (!this.isMobile || !this.layers) return;

    let beta = e.beta || 0;
    let gamma = e.gamma || 0;

    if (beta > 90) beta = 90;
    if (beta < -90) beta = -90;

    const yRaw = (beta - 45) / 45;
    const xRaw = gamma / 45;

    const x = Math.min(Math.max(xRaw, -1), 1);
    const y = Math.min(Math.max(yRaw, -1), 1);

    this.applyParallax(x, y);
  }

  private applyParallax(x: number, y: number) {
    if (!this.layers) return;

    this.layers.forEach((layer) => {
      let moveX = 0;
      let moveY = 0;

      if (layer.classList.contains('layer-bg')) {
        moveX = -x * 40;
        moveY = -y * 30;
      } else if (layer.classList.contains('layer-mid')) {
        moveX = x * 20;
        moveY = y * 20;
      } else if (layer.classList.contains('layer-front')) {
        moveX = x * 60;
        moveY = y * 40;
      }

      gsap.to(layer, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
  }

  private addGlobalPermissionListeners() {
    if (this.permissionGranted) return;

    const handler = async () => {
       const success = await this.requestMobilePermission();
       if (success) {
         document.body.removeEventListener('click', handler);
         document.body.removeEventListener('touchstart', handler);
       }
    };

    document.body.addEventListener('click', handler, { capture: true });
    document.body.addEventListener('touchstart', handler, { capture: true });
  }
}
