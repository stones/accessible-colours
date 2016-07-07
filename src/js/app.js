import $ from 'jquery'
import 'jquery-ui/sortable'


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
  colourlist.forEach((colour) => {
  $('#list'
).
append('<li style="background-color:' + colour + '" id="' + colour + '"> coll</li>')
})

$('#list').sortable({update: handleSortableUpdate})

})


function handleSortableUpdate() {
  setOrderedList($('#list').sortable("toArray"));
}


function setOrderedList(ordered) {

  $('#outputList').text(JSON.stringify(ordered))

}

