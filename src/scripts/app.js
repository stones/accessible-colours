import $ from 'jquery'
import 'jquery-ui/sortable'
import '../styles/app.css'

const list = [
  '#ff7350',
  '#eeb016',
  '#ed8cba',
  '#dddaf2',
  '#cae3b3',
  '#b4e9e7',
  '#b4c2c4',
  '#b1c2d7',
  '#b000b5',
  '#a4beb5',
  '#9dd4d2',
  '#96d56d',
  '#8dbaee',
  '#8cedb5',
  '#8c82d8',
  '#8385ad',
  '#79838d',
  '#1c3352',
  '#196e15',
  '#0574bb',
  '#013a81',
  '#013a7e',
  '#00b5b0',
  '#00627d'
]


$(() => {
  setState(list);

  $('.colour-list__colour').on('click', (e) => {
    const $el = $(e.currentTarget)
    setContrast($el)
  })
})

function setState(colourlist) {

  colourlist.forEach((colour) => {
    $('#list').append('<li style="background-color:' + colour + ';' +
    ' width:' + 99.5 / colourlist.length + '%;' +
    '" id="' + colour +
    '" class="colour-list__colour"></li>')
  })

  $('#list').sortable({update: handleSortableUpdate})
}

function setContrast($el) {
  const previousColour = $el.prev().attr('id');
  const currentColour = $el.attr('id');
  const nextColour = $el.next().attr('id');

 let previousContrast = calculateContrast(previousColour, currentColour)
  let nextContrast = calculateContrast(currentColour, nextColour)


  $("#contrast-previous").text(previousContrast.ratio)
  $("#contrast-next").text(nextContrast.ratio)

  $('#colour-previous').css('background-color', previousColour)
  $('#colour-current').css('background-color', currentColour)
  $('#colour-next').css("background-color", nextColour)
}

function handleSortableUpdate(event, ui) {
  setContrast($(ui.item));
  setOrderedList($('#list').sortable("toArray"));
}


function setOrderedList(ordered) {

  $('#input-colours').text(JSON.stringify(ordered))

}

function calculateContrast(colourA, colourB) {
  // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef

  const rgba1 = getRGBA(colourA)
  let rgba2 = getRGBA(colourB)

  const alpha1 = rgba1[3];
  const alpha2 = rgba2[3];

  console.log(rgba1)

  var alpha = alpha1;

  if (alpha >= 1) {
    if (alpha2 < 1) {
      rgba2 = overlayOn(rgba1);
    }


    const lum1 = luminance(rgba1)
    const lum2 = luminance(rgba2)



    var l1 =   lum1 + .05,
      l2 = lum2 + .05,
      ratio = l1 / l2

    if (l2 > l1) {
      ratio = 1 / ratio
    }


    ratio = preciseRound(ratio, 1)

    return {
      ratio: ratio,
      error: 0,
      min: ratio,
      max: ratio
    };
  }

}


// Overlay a color over another
function overlayOn(color) {
  var overlaid = [...color]

  var alpha = color[3];

  if (alpha >= 1) {
    return overlaid;
  }

  for(var i=0; i<3; i++) {
    overlaid[i] = overlaidgba[i] * alpha + color[i] * color[3] * (1 - alpha);
  }

  overlaid[3] = alpha + rgba[3] * (1 - alpha);

  return overlaid;
}



function luminance ( temp) {
  // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  const rgba = temp.slice();

  for(let i=0; i<3; i++) {
    let rgb = rgba[i];

    rgb /= 255;

    rgb = rgb < .03928 ? rgb / 12.92 : Math.pow((rgb + .055) / 1.055, 2.4);

    rgba[i] = rgb;
  }

  return .2126 * rgba[0] + .7152 * rgba[1] + 0.0722 * rgba[2];
}


function convertHex(hex,opacity){
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16)
  const g = parseInt(hex.substring(2,4), 16)
  const b = parseInt(hex.substring(4,6), 16)

  return 'rgba('+r+', '+g+', '+b+', '+opacity/100+')'
}

function getRGBA(rgba){


  if (rgba === 'transparent') {
    rgba = [0,0,0,0];
  }
  else if (typeof rgba === 'string') {
    let rgbaString = rgba;


    if(rgbaString.indexOf('#') !== -1){
      rgbaString = convertHex(rgba,100)
    }

    rgba = rgbaString.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/)

    if (rgba) {
      rgba.shift();
    }else {
      throw new Error('Invalid string: ' + rgbaString);
    }
  }

  if (rgba[3] === undefined) {
    rgba[3] = 1;
  }

  rgba = rgba.map(function (a) { return preciseRound(a, 3) });

  return rgba;

}

function preciseRound(number, decimals) {
  decimals = +decimals || 0;

  var multiplier = Math.pow(10, decimals)

  return Math.round(number * multiplier) / multiplier
}
