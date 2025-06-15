const useScrollToTarget = (containerRef: Ref<HTMLElement | null>) => {
  const scrollToTarget = (targetId: string, offset = 0) => {
    const container = containerRef.value;

    if (!container) {
      return;
    }

    const target = container.querySelectorAll<HTMLElement>(`#${CSS.escape(targetId)}`);

    if (!target?.[0]) {
      return;
    }

    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target[0].getBoundingClientRect().top;

    const scrollOffset = targetTop - containerTop + container.scrollTop - offset;

    container.scrollTo({
      top: scrollOffset,
      behavior: 'smooth',
    });
  };

  return {
    scrollToTarget,
  };
};

export default useScrollToTarget;
