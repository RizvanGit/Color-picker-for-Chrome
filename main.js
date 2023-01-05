const colorPickerButton = document.querySelector('[data-color-picker]')
const colorList = document.querySelector('[data-colors-list]')
const pickedColors = JSON.parse(localStorage.getItem('picked-colors') || '[]')
const clearAll = document.querySelector('[data-clear-all]')


async function activateEyeDropper () {
  try {
      const eyeDropper = new EyeDropper();
      const {sRGBHex} = await eyeDropper.open();
      navigator.clipboard.writeText(sRGBHex)
      
    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex)
      localStorage.setItem('picked-colors', JSON.stringify(pickedColors))
      showColors()
    }
  } catch(error) {
      console.error(error)
  }
}

function showColors () {
  if (!pickedColors.length) return;
  colorList.innerHTML = pickedColors.map(color=>`
    <li class="color">
      <span class="rect" style="background: ${color}; border: 1px solid ${color == '#333333' ? '#eeeeee' : color}"></span>
      <span class="value" data-color="${color}">${color}</span>
    </li>
  `).join('')
  document.querySelector('.colors-picked').classList.remove('hide')
  document.querySelectorAll('.color').forEach(li => {
    li.addEventListener('click', event => {
      copyColor(event.currentTarget.lastElementChild)
    })
  })
}

function copyColor(element) {
  navigator.clipboard.writeText(element.dataset.color)
  element.innerText = 'Copied'
  setTimeout(()=> element.innerText = element.dataset.color, 1000)
}

showColors ()

function clearAllColors () {
  pickedColors.length = 0
  colorList.textContent = null
  localStorage.setItem('picked-colors', JSON.stringify(pickedColors))
  document.querySelector('.colors-picked').classList.add('hide')
}
console.log(clearAll, 'clear btn')
clearAll.addEventListener('click', clearAllColors)
colorPickerButton.addEventListener('click', activateEyeDropper)