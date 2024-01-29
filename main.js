import catsData from "./data"
import "./style.css"

let catEmotion = document.getElementById("cat-emotion")
let getImageBtn = document.getElementById("get-img-btn")
let displayImage = document.getElementById("display-image")
let closeBtn = document.getElementById("close-btn")
let hidden = document.getElementById("hidden")

const getMatchingCatsArray = () => {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedRadio = document.querySelector('input[type="radio"]:checked').value
    const isGif = document.getElementById("gif").checked

    // get the selected emotion of of cats
    const selectedEmotion = catsData.filter((cat) => {
      if (isGif) {
        return cat.emotionTags.includes(selectedRadio) && cat.isGif
      } else {
        return cat.emotionTags.includes(selectedRadio)
      }
    })

    return selectedEmotion
  }
}

const getSingleCatObject = () => {
  const catsArray = getMatchingCatsArray()
  if (catsArray.length === 1) {
    return catsArray[0]
  } else if (catsArray.length > 1) {
    const randomCat = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomCat]
  }
}
const renderCat = () => {
  const catObject = getSingleCatObject()
  displayImage.innerHTML = `<img src="/images/${catObject.image}" class="w-full" alt="${catObject.alt}" />`
  document.getElementById("hidden").style.display = "block"
}

getImageBtn.addEventListener("click", renderCat)

closeBtn.addEventListener("click", () => {
  document.getElementById("hidden").style.display = "none"
})

// add bg when radio id clicked
const highlightRadioOption = (e) => {
  const radioCheckedArray = document.getElementsByClassName("radio")
  for (let radio of radioCheckedArray) {
    radio.classList.remove("clicked")
  }
  document.getElementById(e.target.id).parentElement.classList.add("clicked")
}
catEmotion.addEventListener("change", highlightRadioOption)

// get emotions tag
const getEmotionsArray = (cats) => {
  const emotionsArray = []
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) emotionsArray.push(emotion)
    }
  }
  return emotionsArray
}

// render emotion tags
const renderEmotionRadios = (cats) => {
  const emotions = getEmotionsArray(cats)
  let emotionElement = emotions.map((emotion) => {
    return `
    <div class="radio flex justify-between p-2 border-b border-grey">
    <label for="${emotion}"> ${emotion}</label>
    <input type="radio" id="${emotion}" name="emotions" value="${emotion}" /> 
    </div>`
  })
  catEmotion.innerHTML += emotionElement.join("")
}

renderEmotionRadios(catsData)
