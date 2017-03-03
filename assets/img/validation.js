/* eslint-disable */
var fails = {
  email:      false,
  tel:        false,
  utensilios: false,
  sexo:       false,
  nome:       false,

  validated(){ 
    return this.email && this.tel && this.utensilios && this.sexo && this.nome
  }
}

function newMessagebag(id, msg) {
  let newMessagebag = document.createElement('div')
  newMessagebag.innerHTML = msg
  newMessagebag.id = id
  newMessagebag.classList = ['fail-message']

  return newMessagebag
}

function updateValidationMessage(el, passed, msg){
  let id = 'failMessage' + el.name
  let messagebag = document.getElementById(id)

  if (passed && messagebag !== null){
    messagebag.remove()
  } else if(!passed && messagebag == null) {
    el.parentNode.appendChild(newMessagebag(id, msg))
  }

}

function validateText(el, target){
  let regex = /^([a-zA-Z\u00C0-\u017F]+\s*)*$/
  fails[target] = regex.test(el.value)
  updateValidationMessage(el, fails[target], "O " + target + " não deve conter números ou simbolos")  
}

function validateEmail(el){
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  fails.email = regex.test(el.value)
  updateValidationMessage(el, fails.email, "O email informado é inválido")
}

function validateTel(el){
  let regex = /\(?\d{2}\)?(\d{4,5}|\d{1}\-\d{4})(\-?)\d{4}/
  fails.tel = regex.test(el.value)
  updateValidationMessage(el, fails.tel, "O telefone informado é inválido")
}

function validateCheckboxOrRadio(el, target){
  let name = el.name
  // devia ter usado o próprio el, como veio de elementos(getElementsByName), seria muito mais rápido, mas já fiz assim
  let checks = document.querySelectorAll('input[name=\'' + name + '\']')
  let checked = 0;

  checks.forEach((check) => checked += check.checked, this)

  fails[target] = checked > 0

  updateValidationMessage(checks[checks.length-1], fails[target], "Pelo menos um deve ser selecionado")  
}

function submitValidation() {
  event.preventDefault()
  validateCheckboxOrRadio(document.getElementsByName('sexo')[0], 'sexo')
  validateCheckboxOrRadio(document.getElementsByName('utensilios[]')[0], 'utensilios')
  validateTel(document.getElementsByName('tel')[0])
  validateText(document.getElementsByName('nome')[0], 'nome')
  validateEmail(document.getElementsByName('email')[0])

  if(!fails.validated()){
    alert('Verifique os dados preenchidos')
  } else {
    alert('Inscrição efetuada, verifique a caixa de entrada do seu email!')
    event.target.reset()
  }
}