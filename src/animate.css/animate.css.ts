const animateCSS = ({
  elementId,
  animation,
  prefix = "animate__",
  velocity = "slow",
}: {
  elementId: string;
  animation: string;
  prefix?: string;
  velocity?: string;
}) =>
  new Promise((resolve, _) => {
    const animationName = `${prefix}${animation}`;
    const velocityName = velocity ? `${prefix}${velocity}` : "";
    const node = document.getElementById(elementId);

    node?.classList.add(`${prefix}animated`, animationName, velocityName);

    function handleAnimationEnd(event: any) {
      event.stopPropagation();
      node?.classList.remove(`${prefix}animated`, animationName, velocityName);
      resolve("Animation ended");
    }

    node?.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

export { animateCSS };
