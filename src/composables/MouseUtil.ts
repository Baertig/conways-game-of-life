import { onMounted, onUnmounted, ref, Ref } from "@vue/runtime-dom";

/**
 * @param canvas
 * @returns Mouse Position on a canvas (value is negative if the Mouse is not on the Canvas)
 */
export function useMousePositionOnCanvas(canvas: Ref<HTMLCanvasElement | null>) {
  const mouseX = ref(-1);
  const mouseY = ref(-1);

  const mouseHandler = (event: MouseEvent) => {
    if (canvas.value === null) {
      return;
    }
    mouseX.value = event.clientX - canvas.value.getBoundingClientRect().x;
    mouseY.value = event.clientY - canvas.value.getBoundingClientRect().y;
    if (mouseX.value > canvas.value.width) {
      mouseX.value = -1;
    }
    if (mouseY.value > canvas.value.width) {
      mouseY.value = -1;
    }
  };

  onMounted(() => {
    window.addEventListener("mousemove", mouseHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", mouseHandler);
  });

  return {
    x: mouseX,
    y: mouseY,
  };
}
