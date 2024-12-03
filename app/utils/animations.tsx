function shake(divs: Element[]): void {
  divs.forEach(div => {
    div.classList.add('shake');

    setTimeout(() => {
      div.classList.remove('shake');
    }, 500);
  });
}

function bounce(divs: Element[]): void {
  let timer = 0;

  divs.forEach(div => {
    setTimeout(() => {
      div.classList.add('bounce');
    }, timer);

    setTimeout(() => {
      div.classList.remove('bounce');
    }, timer + 1000);
    timer += 100;
  });
}

export { shake, bounce };