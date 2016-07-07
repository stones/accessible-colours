import $ from 'jquery'
import 'jquery-ui/sortable'
import '../styles/app.css'

const colourlist = [
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
     setState( colourlist );

  $('.colour-list__colour').on('click', (e)=>{
      const $el = $(e.currentTarget)
      setContrast($el)
    })
})

function setState( colourlist ){

  colourlist.forEach((colour) => {
    $('#list').append('<li style="background-color:' + colour + ';'+
    ' width:' + 99.5 /colourlist.length +'%;' +
    '" id="' + colour +
    '" class="colour-list__colour"></li>')
  })

  $('#list').sortable({update: handleSortableUpdate})
}

function setContrast( $el ) {
  $('#colour-previous').css('background-color', $el.prev().attr('id'))
  $('#colour-current').css('background-color', $el.attr('id'))
  $('#colour-next').css("background-color", $el.next().attr('id'))
}

function handleSortableUpdate(event, ui) {
  setContrast( $(ui.item));
  setOrderedList($('#list').sortable("toArray"));
}


function setOrderedList(ordered) {

  $('#input-colours').text(JSON.stringify(ordered))

}


