(function () {
    const panels = Array.from(document.querySelectorAll('.panel'));
    if (panels.length === 0) return;
  
    function getCurrentPanelIndex() {
      const viewportCenterY = window.scrollY + window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
  
      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        const panelCenterY = window.scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(panelCenterY - viewportCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    }
  
    function focusPanel(index) {
      const clamped = Math.max(0, Math.min(panels.length - 1, index));
      panels[clamped].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  
    // Horizontal scroller color fade (white → black) with contrasting text
    const scroller = document.querySelector('.hscroller');
    if (scroller) {
      const updateShade = () => {
        const max = scroller.scrollWidth - scroller.clientWidth;
        const progress = max > 0 ? scroller.scrollLeft / max : 0;

        const r = Math.round(255 - (255 - 173) * progress);
        const g = Math.round(255 - (255 - 216) * progress);
        const b = Math.round(255 - (255 - 236) * progress);
        // const textShade = 255 - shade; // invert for contrast

        scroller.style.setProperty('--r',String(r));
        scroller.style.setProperty('--g',String(g));
        scroller.style.setProperty('--b',String(b));
        // scroller.style.setProperty('--text-shade', String(textShade));

        // const shade = Math.round(255 * (1 - progress)); // 255 (white) → 0 (black)
        // const textShade = 255 - shade; // invert for contrast
        // scroller.style.setProperty('--shade', String(shade));
        // scroller.style.setProperty('--text-shade', String(textShade));
      };
      scroller.addEventListener('scroll', updateShade, { passive: true });
      window.addEventListener('resize', updateShade);
      updateShade();
    }
  })();