import $ from 'jquery'
import 'jquery-ui/sortable'

const colourlist = ['#000', '#111']

$(() => {
  colourlist.forEach((colour) => {
    $('#list').append('<li>' + colour + '</li>')
  })


  $('#list').sortable()

})
