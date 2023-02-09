const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')



const humanExpressions = [
    { img: 'drink.jpg', text: 'Estou com sede' },
    { img: 'food.jpg', text: 'Estou com fome' },
    { img: 'tired.jpg', text: 'Estou cansado' },
    { img: 'hurt.jpg', text: 'Estou machucado' },
    { img: 'happy.jpg', text: 'Estou feliz' },
    { img: 'angry.jpg', text: 'Estou com raiva' },
    { img: 'sad.jpg', text: 'Estou triste' },
    { img: 'scared.jpg', text: 'Estou assustado' },
    { img: 'outside.jpg', text: 'Quero passear' },
    { img: 'home.jpg', text: 'Quero ir para casa' },
    { img: 'school.jpg', text: 'Quero estudar' },
    { img: 'teeth.jpg', text: 'Quero escovar os dentes' },
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text => {

    utterance.text = text
}

const speakText = () => {

    speechSynthesis.speak(utterance)
}

const setVoice = event => { // fucao que seta, modifica o select selecionado

    const selectedVoice = voices.find(voice => voice.name === event.target.value)
    utterance.voice = selectedVoice
}

// FUNCAO QUE É EXECUTADA PARA CADA OBJETO DO ARRAY HUMAN EXPRESSIONS
const createExpressionBox = ({ img, text }) => { // criando cada div para mostrar cada imagem
    const div = document.createElement('div') // metodo para criar a div

    div.classList.add('expression-box') // configurando a classe e o html interno
    div.innerHTML = ` 
        <img src="${img}" alt="${text}">
        <p class="info">${text}</p>
    `
    div.addEventListener ('click', () => { // evento de click  que ira fazer as vozes funcionarem quando clicada na caixa de texto
        setTextMessage(text)
        speakText() // funcao que ativa a fala do texto

        div.classList.add('active')// add clase que da efeito de sombra no momento que o evento do clique for disparado
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000);

    })

    main.appendChild(div) // metodo que add todas as divs dentro do main
}

humanExpressions.forEach(createExpressionBox) // funcao que irar iterar cada div

let voices = [] // array que vamos preencher nosso select com as voices da api.


speechSynthesis.addEventListener('voiceschanged', () => { // evento que vai pegar as vozes da api e quando a voz mudar é executado
    voices = speechSynthesis.getVoices()
    const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil')
    const microsoftVoice = voices.find(voice =>
        voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)')


    voices.forEach(({ name, lang})  => {
        const option = document.createElement('option') // com as vozes vamos iterar com forEach para criar o elemento option

        option.value = name // Aqui vamos setar os valores da vozes do option

        if (googleVoice && option.value === googleVoice.name) {
            utterance.voice = googleVoice
            option.select = true
        } else if (microsoftVoice && option.value === microsoftVoice.name) {
            utterance.voice = microsoftVoice
            option.selected = true
        }

        option.textContent = `${lang} | ${name}` // Aqui estamos setando o texto dos option
        selectElement.appendChild(option) // Aqui inserimos os texto do option dentro do nosso select
        
    })

})


buttonInsertText.addEventListener('click', () => { // ouvinte de eventos que faz a div inserir texto aparecer na tela com o clique do mouse
    divTextBox.classList.add('show') // add a classe show a nossa div atraves do add

})

closeDivTextBox.addEventListener('click', () => { // evento de click que vai remover a div da tela
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change',  setVoice)

buttonReadText.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})