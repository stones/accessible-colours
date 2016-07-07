import $ from 'jquery'
import 'jquery-ui/sortable'

const colourlist = ['#000', '#FFF']

$(() => {
  colourlist.forEach((colour) => {
    $('#list').append('<li style="background-color:' + colour + '" id="'+ colour +'"> coll</li>')
  })

  $('#list').sortable({update: handleSortableUpdate })

})


function handleSortableUpdate( ) {
  setOrderedList( $('#list').sortable("toArray") );
}


function setOrderedList( ordered ){

  $('#outputList').text( JSON.stringify(ordered))
  
}

