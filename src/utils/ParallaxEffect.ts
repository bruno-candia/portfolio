import gsap from 'gsap';

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export class ParallaxEffect {
  private section: HTMLElement;
  private layers: NodeListOf<HTMLElement> | null = null;
  private isMobile: boolean = false;
  private permissionGranted: boolean = false;

  public pupilLimitTop: number = 20;
  public pupilLimitBottom: number = 15;
  public pupilLimitLeft: number = 30;
  public pupilLimitRight: number = 30;
  public pupilCenterX: number = 0;
  public pupilCenterY: number = 0;

  constructor(section: HTMLElement) {
    this.section = section;
    this.checkMobile();
    // Use bind to ensure 'this' context is preserved when passing as callback
    this.onDeviceOrientationBinder = this.onDeviceOrientation.bind(this);
    this.onMouseMoveBinder = this.onMouseMove.bind(this);

    // Only enable if we have layers, but we might set layers later.
    // So we listen to resize to re-check mobile state.
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.enable());
    }
  }

  public setLayers(layers: NodeListOf<HTMLElement> | null) {
    this.layers = layers;
    // Re-enable to ensure listeners are valid for the current layers/mode
    this.enable();
  }

  public enable() {
    this.checkMobile();
    if (this.isMobile) {
      if (
        this.permissionGranted ||
        (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof (
            DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
          ).requestPermission !== 'function')
      ) {
        this.enableMobile();
      } else {
        this.addGlobalPermissionListeners();
      }
    } else {
      this.enableDesktop();
    }
  }

  public destroy() {
    window.removeEventListener(
      'deviceorientation',
      this.onDeviceOrientationBinder
    );
    this.section.removeEventListener('mousemove', this.onMouseMoveBinder);
    // Clean up other potential listeners if needed
  }

  public async requestMobilePermission(): Promise<boolean> {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)
        .requestPermission === 'function'
    ) {
      try {
        const state = await (
          DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
        ).requestPermission!();
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
    window.removeEventListener(
      'deviceorientation',
      this.onDeviceOrientationBinder
    );
    this.section.removeEventListener('mousemove', this.onMouseMoveBinder);
    this.section.addEventListener('mousemove', this.onMouseMoveBinder);
  }

  private onDeviceOrientationBinder: (e: DeviceOrientationEvent) => void;
  private onMouseMoveBinder: (e: MouseEvent) => void;

  private enableMobile() {
    this.section.removeEventListener('mousemove', this.onMouseMoveBinder);
    window.removeEventListener(
      'deviceorientation',
      this.onDeviceOrientationBinder
    );
    window.addEventListener(
      'deviceorientation',
      this.onDeviceOrientationBinder
    );
  }

  private onMouseMove(e: MouseEvent) {
    if (this.isMobile || !this.layers) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

    this.applyParallax(x, y);
  }

  private onDeviceOrientation(e: DeviceOrientationEvent) {
    if (!this.isMobile || !this.layers) return;

    let beta = e.beta || 0;
    const gamma = e.gamma || 0;

    // Clamp values
    if (beta > 90) beta = 90;
    if (beta < -90) beta = -90;

    // Normalize roughly to -1 to 1
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

      // Custom multipliers for eye effect
      // If we want the pupil to follow the mouse, we move it TOWARDS the mouse (positive x/y)
      // The user provided code had custom logical classes.

      if (layer.classList.contains('layer-pupil')) {
        // Pupil follows mouse.
        // x and y are -1 to 1.
        // We use specific limits for each direction.

        const limitX = x > 0 ? this.pupilLimitRight : this.pupilLimitLeft;
        const limitY = y > 0 ? this.pupilLimitBottom : this.pupilLimitTop;

        moveX = this.pupilCenterX + x * limitX;
        moveY = this.pupilCenterY + y * limitY;
      } else if (layer.classList.contains('layer-bg')) {
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
    if (typeof window !== 'undefined') {
      this.isMobile =
        window.innerWidth <= 768 ||
        window.matchMedia('(pointer: coarse)').matches;
    }
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
