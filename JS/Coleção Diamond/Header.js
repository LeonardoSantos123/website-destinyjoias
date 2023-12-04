function scrollToNextContent() {
  const nextContentElement = document.querySelector('.next-content');

  if (nextContentElement) {
    nextContentElement.scrollIntoView({ behavior: 'smooth' });
  }
}