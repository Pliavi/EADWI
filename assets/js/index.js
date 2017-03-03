function goto(page) {
  const DONE = 4
  const OK = 200
  let ajax = new XMLHttpRequest()
  
  if(typeof event !== 'undefined') event.preventDefault()

  ajax.onreadystatechange = function() {
    if (this.readyState == DONE && this.status == OK) {
      document.getElementById('main-page').innerHTML = this.responseText
      if(page == '2016') renderLightBox()
    }
  }

  ajax.open('GET', 'pages/' + page + '.html', true)
  ajax.send()
}

goto('main')