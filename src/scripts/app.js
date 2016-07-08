import $ from 'jquery'
import 'jquery-ui/sortable'
import '../styles/app.css'

import color from "tinycolor2";

const standards = [
  {
    name: 'AA',
    sizes: ['small', 'large']
  },
  {
    name: 'AAA',
    sizes: ['small', 'large']
  }
]

let list = [
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

  $('.colour-list').on('click', '.colour-list__colour', (e) => {
    const $el = $(e.currentTarget)
    setContrast($el)
  })

  $('.colour-list').on('dblclick', '.colour-list__colour', (e) => {
    const colour = $(e.currentTarget).attr('id')
    let listing = [...list]

    let index = listing.indexOf( colour )
    let head = listing.splice(0, index)

    const test = orderColours( listing, colour)

    setState(head.concat( test ))
  })
})

function setState(colourlist) {
  $('#list').empty()

  colourlist.forEach( (colour) => {

    $("#list").append('<li style="background-color:' + colour + ';' +
    ' width:' + 99.5 / colourlist.length + '%;' +
    '" id="' + colour +
    '" class="colour-list__colour"></li>')
  })

  $('#list').sortable({update: handleSortableUpdate})

  setOrderedList(colourlist)
}


function orderColours( list, head ){

  let tail = [...list]
  let colours = [ head ]

  let index = tail.indexOf( head );

  if (index > -1) {
    tail.splice(index, 1);
  }

  for(let i = tail.length -1; i >= 0; i--){
    let head = color.mostReadable(head, tail).toHexString()
    colours.push(head)
    index = tail.indexOf( head )
    tail.splice(index, 1);
  }

    return colours;
}


function setContrast($el) {
  const previousColour = $el.prev().attr('id');
  const currentColour = $el.attr('id');
  const nextColour = $el.next().attr('id');


  $("#ratio-previous").text( Math.round( color.readability( previousColour, currentColour )) )
  $("#ratio-next").text( Math.round( color.readability( nextColour, currentColour )));


  $('#previousWCAG').empty();

  standards.forEach((level) => {

    level.sizes.forEach((size) => {
      let name = level.name;
      let status = color.isReadable( previousColour, currentColour, { level: name, size: size} );
      $('#previousWCAG').append('<li > ' + name+' Standard  ('+ size +'): '+ status +'</li>')
    })

  })


  $('#nextWCAG').empty();

  standards.forEach((level) => {
    level.sizes.forEach((size) => {
      let name = level.name;
      let status = color.isReadable( nextColour, currentColour, { level: name, size: size} )
      $('#nextWCAG').append('<li > ' +
        name +' Standard  ('+ size +'): '+ status +'</li>')
    })
  })


  $('#colour-previous').css('background-color', previousColour)
  $('#colour-current').css('background-color', currentColour)
  $('#colour-next').css('background-color', nextColour)
}

function handleSortableUpdate(event, ui) {
  setContrast($(ui.item));
  setOrderedList($('#list').sortable("toArray"))
}


function setOrderedList(ordered) {
  $('#input-colours').text(JSON.stringify(ordered))

  list = ordered
}

