const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')



const humanExpressions = [
    { img: 'drink.jpg', text: 'Estou sede' },
    { img: 'food.jpg', text: 'Estou fome' },
    { img: 'tired.jpg', text: 'Estou cansado' },
    { img: 'hurt.jpg', text: 'Estou machucado' },
    { img: 'happy.jpg', text: 'Estou feliz' },
    { img: 'angry.jpg', text: 'Estou raiva' },
    { img: 'sad.jpg', text: 'Estou triste' },
    { img: 'scared.jpg', text: 'Estou assustado' },
    { img: 'outside.jpg', text: 'Quero ir la fora' },
    { img: 'home.jpg', text: 'Quero ir para casa' },
    { img: 'school.jpg', text: 'Quero ir para a escola' },
    { img: 'grandma.jpg', text: 'Quero ver a vovó' },
]



const addExpressionsBoxesIntoDom = () => { // criando as divs no DOM
    
    // criará um novo array com a mesmo tamanho do original, porem com divs em formato de string ao inves de objeto
    
    main.innerHTML = humanExpressions.map(({img, text}) => ` 
        <div class='expression-box' data-js='${text}'>
            <img src='${img}' alt='${text}' data-js='${text}'>
            <p class='info' data-js='${text}'>${text}>/p>
        </div>
     `).join('') // retornara uma  string concatenado sem virgulas ao inves do objeto



}

addExpressionsBoxesIntoDom() //  setando valores da img e do paragrafo com o evento de click

const setStyleOfClickedDiv = dataValue => {
    const div = document.querySelector(`[data-js='${clickedElement.dataset.js}']`)

    div.classList.add('active') // criação e configuração da div
    setTimeout(() => {
       div.classList.remove('active') 
    }, 1000);
}

main.addEventListener('click', event => {
    const clickedElement = event.target
    const clickedElementText = clickedElement.dataset.js
    const clickedElementTextMustBeSpoken = ['img', 'p'].some(elementName =>
        clickedElement.tagName.toLowerCase() === elementName.toLocaleLowerCase())

    if(clickedElementTextMustBeSpoken) {
        setTextMessage(clickedElementText)
        speakText()
        setStyleOfClickedDiv()

    }
})

const insertOptionElementsIntoDom = voices => {
    selectElement.innerHTML = voices.reduce((accumulator, { name, lang }) => {
        accumulator += `<option value='${name}'>'${lang}' | '${name}'</option>`
        return accumulator
    }, '')
}

const setUtteranceVoice = voice => {
    utterance.voice = voice
        const voiceOptionElement = selectElement.querySelector(`[value='${voice.name}']`)
        voiceOptionElement.selected = true
}

const setPTBRVoices = voices => {
    const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil')

    const microsoftVoice = voices.find(voice =>
            voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)')

    if (googleVoice) {
        setUtteranceVoice(googleVoice)
    } else if (microsoftVoice) {
       setUtteranceVoice(microsoftVoice)
    }
}

let voices = [] // array que vamos preencher nosso select com as voices da api.


speechSynthesis.addEventListener('voiceschanged', () => { // evento que vai pegar as vozes da api e quando a voz mudar é executado
    voices = speechSynthesis.getVoices()

    insertOptionElementsIntoDom(voices)
    setPTBRVoices(voices)

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
