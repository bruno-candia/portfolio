interface Drip {
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  length: number;
  maxLength: number;
}

export class SprayEffect {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mobileCursor: HTMLElement | null = null;
  private clearHint: HTMLElement | null = null;
  private sprayInterval: number | null = null;
  private dripAnimationFrame: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private currentColor: string;
  private isMobile: boolean;
  private lastTapTime = 0;
  private drips: Drip[] = [];
  private sprayTime = 0;
  private hasDrawn = false;
  private resizeObserver: ResizeObserver | null = null;
  private cachedRotation: number | null = null;

  private config = {
    sprayRadius: 5,
    sprayDensity: 30,
    particleSizeMin: 0.5,
    particleSizeMax: 2,
    smokeEnabled: true,
    mobileOffsetX: -40,
    mobileOffsetY: -20,
    dripChance: 0.01,
    dripSpeedMin: 0.1,
    dripSpeedMax: 0.3,
    dripMaxLength: 30,
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d')!;
    this.currentColor = this.getRandomColor();
    this.isMobile = 'ontouchstart' in window;
  }

  init(): void {
    this.container.appendChild(this.canvas);

    if (this.isMobile) {
      this.mobileCursor = this.createMobileCursor();
      this.container.appendChild(this.mobileCursor);
    }

    this.clearHint = this.createClearHint();
    const visualsElement = this.container.closest('.hero__visuals');
    if (visualsElement) {
      visualsElement.appendChild(this.clearHint);
    } else {
      this.container.appendChild(this.clearHint);
    }

    this.setupEvents();
    this.setupResizeObserver();
    this.cachedRotation = this.calculateContainerRotation();
    this.startDripAnimation();
  }

  destroy(): void {
    this.container.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    this.container.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.removeEventListener('mouseleave', this.handleMouseUp.bind(this));
    this.container.removeEventListener('mousemove', this.handleMouseMove.bind(this));

    this.container.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.container.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    this.container.removeEventListener('touchmove', this.handleTouchMove.bind(this));

    this.resizeObserver?.disconnect();
    this.stopSpray();
    this.stopDripAnimation();
    this.canvas.remove();
    this.mobileCursor?.remove();
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.classList.add('hero__spray-canvas');
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    return canvas;
  }

  private createMobileCursor(): HTMLElement {
    const cursor = document.createElement('div');
    cursor.classList.add('hero__spray-mobile-cursor');
    cursor.style.cssText = `
      position: absolute;
      width: 32px;
      height: 32px;
      background-image: url('/assets/images/icons/spray-can.png');
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.15s ease;
    `;
    return cursor;
  }

  private createClearHint(): HTMLElement {
    const hint = document.createElement('div');
    hint.classList.add('hero__spray-hint');
    const action = this.isMobile ? 'Double tap' : 'Right-click';
    hint.textContent = `${action} to clear`;
    return hint;
  }

  private showClearHint(): void {
    if (this.clearHint && !this.hasDrawn) {
      this.hasDrawn = true;
      this.clearHint.classList.add('is-visible');
    }
  }

  private hideClearHint(): void {
    if (this.clearHint) {
      this.hasDrawn = false;
      this.clearHint.classList.remove('is-visible');
    }
  }

  private showMobileCursor(): void {
    if (this.mobileCursor) {
      this.mobileCursor.style.opacity = '1';
    }
  }

  private hideMobileCursor(): void {
    if (this.mobileCursor) {
      this.mobileCursor.style.opacity = '0';
    }
  }

  private updateMobileCursorPosition(): void {
    if (this.mobileCursor) {
      this.mobileCursor.style.transform = `translate(${this.mouseX - 16}px, ${this.mouseY - 16}px)`;
    }
  }

  private setupEvents(): void {
    this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.container.addEventListener('contextmenu', this.handleRightClick.bind(this));

    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
  }

  private handleResize(): void {
    // Use clientWidth/Height instead of getBoundingClientRect to get unrotated dimensions
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }

  private getRandomColor(): string {
    const colors = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF',
      '#FF6600',
      '#9900FF',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private paintSpray(): void {
    const { sprayRadius, sprayDensity, particleSizeMin, particleSizeMax } = this.config;

    for (let i = 0; i < sprayDensity; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius;

      if (offsetX * offsetX + offsetY * offsetY <= sprayRadius * sprayRadius) {
        const x = this.mouseX + offsetX;
        const y = this.mouseY + offsetY;
        const radius = Math.random() * (particleSizeMax - particleSizeMin) + particleSizeMin;

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.currentColor;
        this.ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        this.ctx.fill();
      }
    }
    this.ctx.globalAlpha = 1;
  }

  private createDrip(): void {
    const { dripChance, dripSpeedMin, dripSpeedMax, dripMaxLength, sprayRadius } = this.config;

    const timeMultiplier = Math.min(this.sprayTime / 2000, 3);
    const adjustedChance = dripChance * (1 + timeMultiplier);
    const lengthMultiplier = 1 + timeMultiplier;

    if (Math.random() < adjustedChance) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius;

      this.drips.push({
        x: this.mouseX + offsetX,
        y: this.mouseY,
        color: this.currentColor,
        speed: Math.random() * (dripSpeedMax - dripSpeedMin) + dripSpeedMin,
        size: Math.random() * 1.5 + 0.5,
        length: 0,
        maxLength: (Math.random() * dripMaxLength + 5) * lengthMultiplier,
      });
    }
  }

  private updateDrips(): void {
    const rotation = this.cachedRotation ?? 0; // Use cached value

    for (let i = this.drips.length - 1; i >= 0; i--) {
      const drip = this.drips[i];

      if (drip.length < drip.maxLength && drip.speed > 0.05) {
        const originX = drip.x;
        const originY = drip.y;

        const dx = Math.sin(rotation) * drip.length;
        const dy = Math.cos(rotation) * drip.length;

        this.ctx.beginPath();
        this.ctx.arc(originX + dx, originY + dy, drip.size, 0, Math.PI * 2);
        this.ctx.fillStyle = drip.color;
        this.ctx.globalAlpha = 0.6;
        this.ctx.fill();

        drip.length += drip.speed;
        drip.speed *= 0.99;
      } else {
        this.drips.splice(i, 1);
      }
    }
    this.ctx.globalAlpha = 1;
  }

  private startDripAnimation(): void {
    const animate = (): void => {
      this.updateDrips();
      this.dripAnimationFrame = requestAnimationFrame(animate);
    };
    this.dripAnimationFrame = requestAnimationFrame(animate);
  }

  private stopDripAnimation(): void {
    if (this.dripAnimationFrame) {
      cancelAnimationFrame(this.dripAnimationFrame);
      this.dripAnimationFrame = null;
    }
  }

  private createSmoke(x: number, y: number, size: number, velocityX: number, velocityY: number): void {
    const smoke = document.createElement('div');
    smoke.classList.add('hero__spray-cursor-smoke');

    smoke.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background-color: ${this.currentColor};
      transform: translate(${x}px, ${y}px);
      z-index: 2;
    `;

    this.container.appendChild(smoke);
    this.animateSmoke(smoke, x, y, velocityX, velocityY);
  }

  private animateSmoke(smoke: HTMLElement, x: number, y: number, velocityX: number, velocityY: number): void {
    let posX = x;
    let posY = y;
    const startTime = performance.now();

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;

      if (elapsed > 400) {
        smoke.remove();
        return;
      }

      const opacity = Math.max(0, 1 - (elapsed / 400) * 2);
      posX += velocityX;
      posY += velocityY - 0.5;

      smoke.style.transform = `translate(${posX}px, ${posY}px)`;
      smoke.style.opacity = String(opacity);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private spraySmoke(): void {
    if (!this.config.smokeEnabled) return;

    const smokeCount = 4;
    for (let i = 0; i < smokeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 10;
      const velocityX = Math.cos(angle) * (Math.random() * 1);
      const velocityY = Math.sin(angle) * (Math.random() * 1);

      this.createSmoke(
        this.mouseX + Math.cos(angle) * distance,
        this.mouseY + Math.sin(angle) * distance,
        Math.random() * 6 + 2,
        velocityX,
        velocityY
      );
    }
  }

  private spray(): void {
    this.paintSpray();
    this.spraySmoke();
    this.createDrip();
    this.sprayTime += 30;
  }

  private startSpray(): void {
    if (this.sprayInterval) return;

    this.currentColor = this.getRandomColor();
    this.sprayTime = 0;
    this.spray();
    this.sprayInterval = window.setInterval(() => this.spray(), 30);
    this.showClearHint();
  }

  private stopSpray(): void {
    if (this.sprayInterval) {
      clearInterval(this.sprayInterval);
      this.sprayInterval = null;
    }
    this.sprayTime = 0;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drips = [];
    this.hideClearHint();
  }

  private handleMouseDown(e: MouseEvent): void {
    if (e.button === 0) {
      this.updateMousePosition(e);
      this.startSpray();
    }
  }

  private handleMouseUp(): void {
    this.stopSpray();
  }

  private handleMouseMove(e: MouseEvent): void {
    this.updateMousePosition(e);
    if (this.sprayInterval) {
      this.spray();
    }
  }

  private handleRightClick(e: MouseEvent): void {
    e.preventDefault();
    this.clearCanvas();
  }

  private updateMousePosition(e: MouseEvent): void {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
  }

  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();

    const now = Date.now();
    if (now - this.lastTapTime < 200) {
      this.clearCanvas();
      this.lastTapTime = 0;
      return;
    }
    this.lastTapTime = now;

    this.updateTouchPosition(e);
    this.showMobileCursor();
    this.updateMobileCursorPosition();
    this.startSpray();
  }

  private handleTouchEnd(): void {
    this.stopSpray();
    this.hideMobileCursor();
    const holdDuration = Date.now() - this.lastTapTime;
    if (holdDuration > 200) {
      this.lastTapTime = 0;
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    this.updateTouchPosition(e);
    this.updateMobileCursorPosition();
    if (this.sprayInterval) {
      this.spray();
    }
  }

  private updateTouchPosition(e: TouchEvent): void {
    const touch = e.touches[0];
    if (touch) {
      const rect = this.container.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.mouseX = x + this.config.mobileOffsetX;
      this.mouseY = y + this.config.mobileOffsetY;
    }
  }

  private calculateContainerRotation(): number {
    let element = this.container;
    let style = window.getComputedStyle(element);
    let transform = style.transform;

    if (transform === 'none' && element.parentElement) {
      element = element.parentElement;
      style = window.getComputedStyle(element);
      transform = style.transform;
    }

    if (transform === 'none' || !transform) return 0;

    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    const angle = Math.atan2(b, a);


    return angle;
  }
}
