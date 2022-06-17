const makeEaseOut = (timing) => {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

const bounce = (timeFraction) => {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

const quad = (timeFraction) => {
  return Math.pow(timeFraction, 2);
}

const isBallInSquare = (width, height) => {
  console.log(width);
  if (width < 16 && height < 16) {
    square.style.background = 'green'
    return startButton.disabled = false
  } else {
    square.style.background = 'red'
    return startButton.disabled = true
  }
  
}


startButton.onclick = () => {

  let height = 400 - ball.clientHeight; 
  let width = 500;

  animate({
    duration: 2000,
    timing: makeEaseOut(bounce),
    draw: (progress) => {
      ball.style.top = height * progress + 'px'
    }
  });

  animate({
    duration: 2000,
    timing: makeEaseOut(quad),
    draw: (progress) => {
      ball.style.left = width * progress + "px"
    }
  });

  startButton.disabled = true
  square.style.background = 'red'
}

ball.onmousedown = (event) => {

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  document.body.append(ball);

  const moveAt = (pageX, pageY) => {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
    isBallInSquare(pageX - ball.offsetWidth / 2, pageY - ball.offsetHeight / 2)
  }

  moveAt(event.pageX, event.pageY);

  const onMouseMove = (event) => {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;

  };

  ball.ondragstart = () => {
    return false;
  };



};




