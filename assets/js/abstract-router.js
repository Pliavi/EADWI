function goto(route) {
  const DONE = 4
  const OK = 200
  let ajax = new XMLHttpRequest()
  
  if(typeof event !== 'undefined') event.preventDefault()

  ajax.onreadystatechange = function() {
    if (this.readyState == DONE && this.status == OK) {
      document.getElementById('main-page').innerHTML = this.responseText
      eval(document.getElementById('main-page'))
    }
  }

  ajax.open('GET', 'pages/' + route + '.html', true)
  ajax.send()
}

goto('main')