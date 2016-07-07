import $ from 'jquery'

const colourlist = ['#000', '#111']

$(() => {
  colourlist.forEach((colour) => {
    $('#list').append('<li>' + colour + '</li>')
  })
})
