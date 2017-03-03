// UNIQUE PER PAGE LIGHTBOX
// Desafio da parada: NÃO USAR NENHUM TIPO DE LOOP
// Erro Conhecido: Não sei encapsular o arquivo ainda (todas as funções e valores globais podem ser acessados de qualquer lugar)
var slideconfig = { 
  last: -1, 
  current: 0, 
  next: 1, 
  size: 1
}
var slides = []

// eslint-disable-next-line no-unused-vars
function renderLightBox() { 
  const seletor = 'a[is-lightbox]'
  const body = document.getElementsByTagName('body')[0]
  
  // Criar a área do Lightbox
  let lightboxArea = document.createElement('div')
  lightboxArea.id = 'lightbox-area'

  // Renderizar a área do lightbox
  lightboxArea.innerHTML = 
  `
    <a class="lightbox-button lightbox-button-left" href="#last">
      <div class='lightbox-goto lightbox-left'></div>
    </a>
    <div id='lightbox-photo'>
      <div id='lightbox-close'></div>
      <img id='lightbox-image' src="#placeholder"/>
      <div id='lightbox-caption'>Placeholder</div>
    </div>
    <a class="lightbox-button lightbox-button-right" href="#next">
      <div class='lightbox-goto lightbox-right'></div>
    </a>    
  `
  body.appendChild(lightboxArea)

  // Cria a lista de imagens e troca os links atuais
  let imagens = [...document.querySelectorAll(seletor)] // Spreadoperator, sem ele ia ser treta xD
  imagens.map(renderThumbs)
  slideconfig.size = imagens.length

  // Seta os listeners dos botoes
  let leftButton = document.getElementsByClassName('lightbox-button-left')[0]
  let rightButton = document.getElementsByClassName('lightbox-button-right')[0]
  let closeButton = document.getElementById('lightbox-close')
  leftButton.addEventListener('click', gotoLast)
  rightButton.addEventListener('click', gotoNext)
  closeButton.addEventListener('click', lightboxClose)
}

function renderThumbs(imagem, index) {
  // Cria o link da thumb, baseado no link da imagem
  let src = imagem.href.split('/')
  src[src.length] = src[src.length-1] // pega o ultimo valor e repete como um novo último
  src[src.length-2] = 'thumbs' // troca o penúltimo(antes último) valor por 'thumbs'
  src = src.join('/')

  // Definições da Tag
  let img = document.createElement('img')
  img.src = src 
  img.alt = imagem.innerText
  img.title = imagem.innerText
  img.classList = ['lightbox-image']
  img.setAttribute('lightbox-sequence', index) // Sequencia para iniciar o slide no local correto
  // img.addEventListener('click', openLightBox)

  // Redefindo os attributes e valores da tag com o link orignal
  imagem.innerText = ''
  imagem.classList = ['lightbox-link']
  imagem.setAttribute('lightbox-sequence', index) // Sequencia para iniciar o slide no local correto  
  imagem.removeAttribute('is-lightbox')
  imagem.appendChild(img)
  // imagem.addEventListener('click', (e) => e.preventDefault())
  imagem.addEventListener('click', openLightBox)
  

  // Seta a imagem para o slide
  slides.push(imagem.href)
}

// abre o lightbox na imagem clicada e define o valores do slide, chmando o update pra trocar a view
function openLightBox(e) {
  document.getElementById('lightbox-area').style.display = 'flex'

  slideconfig.current = e.target.getAttribute('lightbox-sequence')
  slideconfig.last = slideconfig.current - 1
  slideconfig.next = +slideconfig.current + 1

  lightboxUpdate()
  e.preventDefault()
}

function lightboxUpdate() {
  let leftButton = document.getElementsByClassName('lightbox-button-left')[0]
  let rightButton = document.getElementsByClassName('lightbox-button-right')[0]
  let photo = document.getElementById('lightbox-photo')

  // Alterana o botão voltar e alinha a foto
  if(slideconfig.last == -1) {
    leftButton.style.display = 'none'
    photo.style.marginLeft = '96px'
  } else {
    leftButton.style.display = 'flex'
    photo.style.marginLeft = '0'
  }

  // Alterana o botão proximo e alinha a foto
  if(slideconfig.next == slideconfig.size) {
    rightButton.style.display = 'none'
    photo.style.marginRight = '96px'
  } else {
    rightButton.style.display = 'flex'
    photo.style.marginRight = '0'
  }

  // Atualizaa foto e a legenda
  document.getElementById('lightbox-image').src = document.querySelector('a[lightbox-sequence=\'' + slideconfig.current + '\']').href
  document.getElementById('lightbox-caption').innerHTML = document.querySelector('img[lightbox-sequence=\'' + slideconfig.current + '\']').title
} 

function gotoNext() {
  slideconfig.current = +slideconfig.current + 1
  slideconfig.last = slideconfig.current - 1
  slideconfig.next = +slideconfig.current + 1

  lightboxUpdate()
}

function gotoLast() {
  slideconfig.current -= 1
  slideconfig.last = slideconfig.current - 1
  slideconfig.next = +slideconfig.current + 1

  lightboxUpdate()
}

function lightboxClose(){
  document.getElementById('lightbox-area').style.display = 'none'
}
